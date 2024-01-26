# fastify-pdf-export

The `fastify-pdf-export` plugin for Fastify enables the generation and export of PDF files from URLs using Puppeteer.

## Installation

```sh
npm install @autotelic/fastify-pdf-export
```

## Usage

```js
const fastify = require('fastify')()
const fastifyPdfExport = require('fastify-pdf-export')

fastify.register(fastifyPdfExport)

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`Server listening on ${fastify.server.address().port}`)
})
```

### Exporting a PDF

```javascript
fastify.pdfExport({
  pdfUrl: 'http://example.com',
  outputOpts: {
    format: 'A4',
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  }
}).then(({ browser, page }) => {
  // PDF export is complete
  // You can close the browser and handle the page object as needed
  browser.close()
}).catch(error => {
  console.error(error)
})
```

## Options

When calling `pdfExport`, you can pass an options object with the following properties:

- **pdfUrl** (required): The URL of the web page to be converted to PDF.
- **outputOpts** (optional): Options for the PDF output, including format and margins. Defaults to A4 size with 20px margins.
- **headless** (optional): Whether to launch Puppeteer in headless mode. Defaults to 'new'.

## Error Handling

Errors are thrown with detailed messages, enabling easy debugging and error handling in your application.

## Contributing

Contributions to `fastify-pdf-export` are welcome. Please follow the standard contributing guidelines of Fastify.

## License

This plugin is licensed under [specify license].

---

This documentation provides a basic guide for installing, using, and understanding the `fastify-pdf-export` plugin. Adjustments can be made based on your specific requirements and any additional functionality your plugin might have.

## Triggering a Release

_Prerequisite: Update repository access for the shared [NPM_PUBLISH_TOKEN](https://github.com/organizations/autotelic/settings/secrets/actions/NPM_PUBLISH_TOKEN) secret._

Trigger the release workflow via a tag

  ```sh
  git checkout main && git pull
  npm version { minor | major | path }
  git push --follow-tags
  ```
