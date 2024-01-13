# bru-js

Javascript Parser library for the Bru markup language.

## Installation

```bash
npm install bru-js
```

## Usage

```javascript
const {parse, stringify} = require('bru-js');

const bru = parse(`
http: {
  method: 'GET'
  url: 'https://www.usebruno.com/hello'
  headers: {
    Content-Type: 'application/json'
  }
}
`);

console.log(stringify(bru));
```

## License
MIT