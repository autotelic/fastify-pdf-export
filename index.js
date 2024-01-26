import fastifyPlugin from 'fastify-plugin'
import { launch } from 'puppeteer'

export async function pdfExport (options = {}) {
  const {
    launchOptions = { headless: 'new', ...options.launchOptions },
    pdfUrl,
    pdfOptions
  } = options

  try {
    if (!pdfUrl) {
      throw new Error('`pdfUrl` is required')
    }

    const browser = await launch(launchOptions)
    const page = await browser.newPage()

    await page.goto(pdfUrl)
    const pdf = await page.pdf(pdfOptions)

    await browser.close()

    return { pdf }
  } catch (error) {
    return { error: `fastify-pdf-export: ${error.message}` }
  }
}

const fastifyPdfExport = fastifyPlugin(async fastify => {
  fastify.decorate('pdfExport', pdfExport)
}, { name: 'fastify-pdf-export' })

export { fastifyPdfExport }
export default fastifyPdfExport
