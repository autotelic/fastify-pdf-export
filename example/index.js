import fastifyPdfExport from '../index.js'

export default async function main (fastify, options) {
  fastify.register(fastifyPdfExport)

  fastify.get('/', async (request, reply) => {
    const { pdfExport } = fastify
    const { pdf } = await pdfExport({
      pdfUrl: 'http://localhost:8080',
      pdfOptions: {
        format: 'A4',
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px'
        }
      }
    })
    reply.type('application/pdf').send(pdf)
  })
}
