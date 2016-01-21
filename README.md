# Weather Diff

Weather Diff is a small web UI for diffing weather between two locations by ZIP code.

## Getting Started

You must have Node.js (≥v4.1.1) and NPM installed.

```bash
npm install
npm run build
npm start
```

Then open <http://localhost:3000>.

## Development

JShint and JSCS are configured to enforce code correctness and style

```bash
npm run test
```

To have the frontend JS code automatically rebuild as you develop:

```bash
npm run watch
```

Note that `npm run build` can be used to produce an optimized JS bundle for production.

Code for the Node.js server is in `src/`, and code for the JS frontend is in `src/app/`. The `app/` folder contains the CSS, HTML, and image assets.

## License

MIT

## Code of Conduct

Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms.

## TODO

- Add tests
