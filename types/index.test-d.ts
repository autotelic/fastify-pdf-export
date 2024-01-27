import fastify, { FastifyInstance } from 'fastify'
import { PaperFormat } from 'puppeteer'
// eslint-disable-next-line import/no-unresolved
import { expectAssignable, expectError } from 'tsd'

import fastifyPdfExport from '..'

const app = fastify()

const opt1 = {
  pdfUrl: 'http://example.com'
}
const opt2 = {
  pdfUrl: 'http://example.com',
  pdfOptions: {
    format: 'A4' as PaperFormat,
    landscape: true
  }
}
const opt3 = {
  pdfUrl: 'http://example.com',
  launchOptions: {
    headless: false
  }
}

expectAssignable<FastifyInstance>(app.register(fastifyPdfExport, opt1))
expectAssignable<FastifyInstance>(app.register(fastifyPdfExport, opt2))
expectAssignable<FastifyInstance>(app.register(fastifyPdfExport, opt3))

const errOpt1 = {}
const errOpt2 = { pdfUrl: {} }
const errOpt3 = {
  pdfUrl: 'http://example.com',
  pdfOptions: {
    format: 1
  }
}
const errOpt4 = {
  pdfUrl: 'http://example.com',
  launchOptions: {
    headless: {}
  }
}

expectError(app.register(fastifyPdfExport, errOpt1))
expectError(app.register(fastifyPdfExport, errOpt2))
expectError(app.register(fastifyPdfExport, errOpt3))
expectError(app.register(fastifyPdfExport, errOpt4))
