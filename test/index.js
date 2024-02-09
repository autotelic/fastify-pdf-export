import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import fastify from 'fastify'
import nock from 'nock'
import { PDFDocument } from 'pdf-lib'
import { test, beforeEach, afterEach } from 'tap'

import fastifyPdfExport from '../index.js'

beforeEach(() => {
  nock.disableNetConnect()
  nock.enableNetConnect('127.0.0.1')
})

afterEach(() => {
  nock.cleanAll()
})

const mockUrl = 'http://example.com'
const __dirname = dirname(dirname(fileURLToPath(import.meta.url)))
const staticHtmlPath = join(__dirname, 'public', 'index.html')
const staticHtmlContent = readFileSync(staticHtmlPath, 'utf-8')

function buildApp ({ pdfUrl, pdfExportOpts = {} } = {}) {
  nock(mockUrl).get('/').reply(200, staticHtmlContent)

  const app = fastify()
  app.register(fastifyPdfExport)

  app.get('/', async (_request, reply) => {
    if (pdfUrl) {
      pdfExportOpts.pdfUrl = pdfUrl
    }

    const { pdf, error } = await app.pdfExport(pdfExportOpts)

    if (error) {
      reply.send({ message: error })
    }

    reply.type('application/pdf').send(pdf)
  })

  return app
}

test('fastify-pdf-export plugin should exist', async ({ ok, teardown }) => {
  teardown(async () => app.close())
  const app = buildApp()
  await app.ready()

  ok(app.hasPlugin('fastify-pdf-export'))
})

test('should generate a PDF for a valid URL', async ({ equal, teardown }) => {
  teardown(async () => app.close())
  const app = buildApp({ pdfUrl: mockUrl })
  await app.ready()

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  equal(response.statusCode, 200)
  equal(response.headers['content-type'], 'application/pdf')
})

test('should throw if no pdfUrl is provided', async ({ same, rejects, teardown }) => {
  teardown(async () => app.close())
  const app = buildApp()
  await app.ready()

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  same(response.json(), {
    message: 'fastify-pdf-export: `pdfUrl` is required'
  })
})

test('should set pdfOptions', async ({ equal, teardown }) => {
  teardown(async () => app.close())
  const app = buildApp({
    pdfExportOpts: {
      pdfUrl: mockUrl,
      pdfOptions: {
        format: 'A3'
      }
    }
  })
  await app.ready()

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  equal(response.statusCode, 200)
  equal(response.headers['content-type'], 'application/pdf')

  const pdf = await PDFDocument.load(response.rawPayload)
  const page = pdf.getPage(0)
  const { width, height } = page.getSize()

  // A3 size in points (1 point = 1/72 inch)
  equal(Math.round(width), 843)
  equal(Math.round(height), 1191)
})

test('should return error is pdfOptions.path is set', async ({ equal, same, teardown }) => {
  teardown(async () => app.close())
  const app = buildApp({
    pdfExportOpts: {
      pdfUrl: mockUrl,
      pdfOptions: {
        path: 'some/path'
      }
    }
  })
  await app.ready()

  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  equal(response.statusCode, 200)
  same(response.json(), {
    message: 'fastify-pdf-export: `pdfOptions.path` is not supported'
  })
})
