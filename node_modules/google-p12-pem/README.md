<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# google-p12-pem
[![npm version](https://img.shields.io/npm/v/google-p12-pem.svg)](https://www.npmjs.org/package/google-p12-pem)
[![codecov](https://img.shields.io/codecov/c/github/googleapis/google-p12-pem/master.svg?style=flat)](https://codecov.io/gh/googleapis/google-p12-pem)
[![Known Vulnerabilities](https://snyk.io/test/github/googleapis/google-p12-pem/badge.svg)](https://snyk.io/test/github/googleapis/google-p12-pem)

Convert your Google `.p12` keys to `.pem` keys.

## Installation
``` sh
npm install google-p12-pem
```

## Usage

### async/await style
```js
const {getPem} = require('google-p12-pem');
async function foo() {
  const pem = await getPem('/path/to/key.p12');
  console.log(pem); // '-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAK...'
}
```

### promise style
```js
const {getPem} = require('google-p12-pem');
getPem('/path/to/key.p12')
  .then(pem => {
    console.log(pem); // '-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAK...'
  })
  .catch(err => {
    console.error(err); // :(
  });

```

### callback style
```js
const {getPem} = require('google-p12-pem');
getPem('/path/to/key.p12', function(err, pem) {
  console.log(pem); // '-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAK...'
});
```

### CLI style

``` sh
gp12-pem myfile.p12 > output.pem
```

## License
[MIT](LICENSE)
