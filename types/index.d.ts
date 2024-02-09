import type { FastifyPluginCallback } from 'fastify'
import { BrowserLaunchArgumentOptions, PDFOptions } from 'puppeteer'

export interface FastifyPdfExportOptions {
  pdfUrl: string
  pdfOptions?: PDFOptions
  launchOptions?: BrowserLaunchArgumentOptions
}

declare const fastifyPdfExport: FastifyPluginCallback<FastifyPdfExportOptions>

export default fastifyPdfExport
export { fastifyPdfExport }
