<img src="https://avatars0.githubusercontent.com/u/1342004?v=3&s=96" alt="Google Inc. logo" title="Google" align="right" height="96" width="96"/>

# Google API Extensions for Node.js

[![Release Level][releaselevelimg]][releaselevel]
[![npm version][npmimg]][npm]
[![Code Coverage][codecovimg]][codecov]

Google API Extensions for Node.js (gax-nodejs) is a set of modules which aids the development of APIs for clients and servers based on [gRPC][grpc] and Google API conventions.

Application code will rarely need to use most of the classes within this library directly, but code generated automatically from the API definition files in [Google APIs][googleapis] can use services such as page streaming and request bundling to provide a more convenient and idiomatic API surface to callers.

## Installation
```sh
$ npm install google-gax
```

## Contributing
Contributions to this library are always welcome and highly encouraged.  See the [CONTRIBUTING][contributing] documentation for more information on how to get started.

## Details
For detailed documentation of the modules in gax-nodejs, please check out the [docs][docs].

## License
BSD - See [LICENSE][license] for more information.

[codecovimg]: https://codecov.io/github/googleapis/gax-nodejs/coverage.svg?branch=master
[codecov]: https://codecov.io/github/googleapis/gax-nodejs?branch=master
[contributing]: https://github.com/googleapis/gax-nodejs/blob/master/CONTRIBUTING.md
[docs]: http://googleapis.github.io/gax-nodejs/
[license]: https://github.com/googleapis/gax-nodejs/blob/master/LICENSE
[npmimg]: https://img.shields.io/npm/v/google-gax.svg
[npm]: https://www.npmjs.org/package/google-gax
[googleapis]: https://github.com/googleapis/googleapis/
[grpc]: http://grpc.io
[releaselevel]: https://cloud.google.com/terms/launch-stages
[releaselevelimg]: https://img.shields.io/badge/Release%20Level-Alpha-ff69b4.svg
