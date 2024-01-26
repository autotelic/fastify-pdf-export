import fastifyPlugin from 'fastify-plugin'
import puppeteer from 'puppeteer'

const defaultOutputOpts = {
  format: 'A4',
  margin: {
    top: '20px',
    right: '20px',
    bottom: '20px',
    left: '20px'
  }
}

export async function pdfExport (options = {}) {
  const {
    headless = 'new',
    pdfUrl,
    outputOpts = { ...defaultOutputOpts, ...options.outputOpts }
  } = options

  const browser = await puppeteer.launch({ headless })
  const page = await browser.newPage()

  await page.goto(pdfUrl)
  await page.pdf(outputOpts)

  return { browser, page }
}

const fastifyPdfExport = fastifyPlugin(async fastify => {
  fastify.decorate('pdfExport', pdfExport)
}, { name: 'fastify-pdf-export' })

export { fastifyPdfExport }
export default fastifyPdfExport
