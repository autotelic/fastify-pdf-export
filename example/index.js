import fastifyPdfExport from '../index.js'

export default async function main (fastify, options) {
  fastify.register(fastifyPdfExport)

  fastify.get('/', async (request, reply) => {
    const { pdfExport } = fastify
    const { browser, page } = await pdfExport({
      pdfUrl: 'http://localhost:8080',
      outputOpts: { path: 'output.pdf' }
    })
    const pdf = await page.pdf()
    await browser.close()
    reply.type('application/pdf').send(pdf)
  })
}
