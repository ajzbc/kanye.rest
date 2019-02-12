<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# [googleapis Proto Files: Node.js Client](https://github.com/googleapis/nodejs-proto-files)

[![release level](https://img.shields.io/badge/release%20level-alpha-orange.svg?style&#x3D;flat)](https://cloud.google.com/terms/launch-stages)
[![CircleCI](https://img.shields.io/circleci/project/github/googleapis/nodejs-proto-files.svg?style=flat)](https://circleci.com/gh/googleapis/nodejs-proto-files)
[![AppVeyor](https://ci.appveyor.com/api/projects/status/github/googleapis/nodejs-proto-files?branch=master&svg=true)](https://ci.appveyor.com/project/googleapis/nodejs-proto-files)
[![codecov](https://img.shields.io/codecov/c/github/googleapis/nodejs-proto-files/master.svg?style=flat)](https://codecov.io/gh/googleapis/nodejs-proto-files)

> Get a copy of the [googleapis](https://github.com/googleapis/googleapis) proto files into your project.

* [github.com/googleapis/nodejs-proto-files](https://github.com/googleapis/nodejs-proto-files)

Read more about the client libraries for Cloud APIs, including the older
Google APIs Client Libraries, in [Client Libraries Explained][explained].

[explained]: https://cloud.google.com/apis/docs/client-libraries-explained

**Table of contents:**

* [Usage](#usage)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [License](#license)

## Usage

```sh
$ npm install --save google-proto-files
```
```js
const protoFiles = require('google-proto-files')
```

### Get a directory path by executing as a function
```js
protoFiles('logging', 'v2')
// node_modules/google-proto-files/google/logging/v2
```

### Get a path to the entry proto file for a specific API version
```js
protoFiles.pubsub.v1
// node_modules/google-proto-files/google/pubsub/v1/pubsub.proto
```

## load|loadSync(fileName, [options])

### [options](https://github.com/dcodeIO/protobuf.js/blob/master/src/parse.js#L42-L44)

### Load a proto which depends on google common protos.
#### Asynchronously
```js
protoFiles.load('path/to/file.proto').then(function(root) {
  const MyService = root.lookup('example.MyService')
})
  ```

#### Synchronously
```js
const root = protoFiles.loadSync('path/to/file.proto');
const MyService = root.lookup('example.MyService');
```

## Versioning

This library follows [Semantic Versioning](http://semver.org/).

This library is considered to be in **alpha**. This means it is still a
work-in-progress and under active development. Any release is subject to
backwards-incompatible changes at any time.

More Information: [Google Cloud Platform Launch Stages][launch_stages]

[launch_stages]: https://cloud.google.com/terms/launch-stages

## Contributing

Contributions welcome! See the [Contributing Guide](https://github.com/googleapis/nodejs-proto-files/blob/master/.github/CONTRIBUTING.md).

## License

Apache Version 2.0

See [LICENSE](https://github.com/googleapis/nodejs-proto-files/blob/master/LICENSE)
