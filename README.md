# fastify-pdf-export

The `fastify-pdf-export` plugin for Fastify enables the generation and export of PDF files from URLs using Puppeteer.

## Installation

```sh
npm install @autotelic/fastify-pdf-export
```

## Usage

```js
import Fastify from 'fastify'
import fastifyPdfExport from 'fastify-pdf-export'

const fastify = Fastify()

fastify.register(fastifyPdfExport)

fastify.get('/', async (request, reply) => {
    const { pdfExport } = fastify
    const { pdf } = await pdfExport({
      pdfUrl: 'http://example.com'
    })
    reply.type('application/pdf').send(pdf)
  })

fastify.listen({ port: 3000 }, err => {
  if (err) throw err
  console.log(`Server listening on ${fastify.server.address().port}`)
})
```

## API

The `fastify-pdf-export` plugin extends your Fastify instance with a new method: `pdfExport`. This method is used to generate PDFs from provided URLs using Puppeteer.

### Methods

#### `pdfExport(options)`

Generates a PDF from the specified URL.

##### Options

- `pdfUrl` (string): **Required**.The URL of the webpage to be converted into a PDF.
- `pdfOptions` (`PDFOptions`): **Optional**. Configuration options for the PDF generation, as defined by Puppeteer's [`PDFOptions`](https://pptr.dev/api/puppeteer.pdfoptions). This includes settings such as `format`, `margin`, `printBackground`, etc.
- `launchOptions` (`BrowserLaunchArgumentOptions`): **Optional**. Configuration options for launching the Puppeteer browser instance, as defined by Puppeteer's [`BrowserLaunchArgumentOptions`](https://pptr.dev/api/puppeteer.browserlaunchargumentoptions). This includes settings such as `headless`, `args`, `ignoreHTTPSErrors`, etc. By default, `headless` is set to `new`.

##### Returns

A promise that resolves to an object containing:

- `pdf`: A `Buffer` containing the generated PDF data.
- `error`: An error object, if any error occurred during the PDF generation process.

##### Example

```js
const { pdf, error } = await fastify.pdfExport({
  pdfUrl: 'http://example.com',
  pdfOptions: { format: 'A4' },
  launchOptions: { headless: 'new' }
});
```
