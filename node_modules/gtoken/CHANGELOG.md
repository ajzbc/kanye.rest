# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/gtoken?activeTab=versions

## v2.3.2

01-09-2019 13:40 PST

### Documentation
- docs: generate docs with compodoc ([#154](https://github.com/googleapis/node-gtoken/pull/154))
- docs: fix up the readme ([#153](https://github.com/googleapis/node-gtoken/pull/153))

### Internal / Testing Changes
- build: Re-generated  to pick up changes in the API or client library generator. ([#158](https://github.com/googleapis/node-gtoken/pull/158))
- build: check broken links in generated docs ([#152](https://github.com/googleapis/node-gtoken/pull/152))
- fix: add a system test and get it passing ([#150](https://github.com/googleapis/node-gtoken/pull/150))
- chore(build): inject yoshi automation key ([#149](https://github.com/googleapis/node-gtoken/pull/149))

## v2.3.1

12-10-2018 15:28 PST

### Dependencies
- fix(deps): update dependency pify to v4 ([#87](https://github.com/google/node-gtoken/pull/87))
- fix(deps): use gaxios for http requests ([#125](https://github.com/google/node-gtoken/pull/125))

### Internal / Testing Changes
- build: add Kokoro configs for autorelease ([#143](https://github.com/google/node-gtoken/pull/143))
- chore: always nyc report before calling codecov ([#141](https://github.com/google/node-gtoken/pull/141))
- chore: nyc ignore build/test by default ([#140](https://github.com/google/node-gtoken/pull/140))
- chore: update synth metadata and templates ([#138](https://github.com/google/node-gtoken/pull/138))
- fix(build): fix system key decryption ([#133](https://github.com/google/node-gtoken/pull/133))
- chore(deps): update dependency typescript to ~3.2.0 ([#132](https://github.com/google/node-gtoken/pull/132))
- chore: add a synth.metadata
- chore(deps): update dependency gts to ^0.9.0 ([#127](https://github.com/google/node-gtoken/pull/127))
- chore: update eslintignore config ([#126](https://github.com/google/node-gtoken/pull/126))
- chore: use latest npm on Windows ([#124](https://github.com/google/node-gtoken/pull/124))
- chore: update CircleCI config ([#123](https://github.com/google/node-gtoken/pull/123))
- chore: include build in eslintignore ([#120](https://github.com/google/node-gtoken/pull/120))
- chore: update issue templates ([#116](https://github.com/google/node-gtoken/pull/116))
- chore: remove old issue template ([#114](https://github.com/google/node-gtoken/pull/114))
- build: run tests on node11 ([#113](https://github.com/google/node-gtoken/pull/113))
- chore(deps): update dependency nock to v10 ([#111](https://github.com/google/node-gtoken/pull/111))
- chores(build): do not collect sponge.xml from windows builds ([#112](https://github.com/google/node-gtoken/pull/112))
- chore(deps): update dependency typescript to ~3.1.0 ([#110](https://github.com/google/node-gtoken/pull/110))
- chores(build): run codecov on continuous builds ([#109](https://github.com/google/node-gtoken/pull/109))
- chore: update new issue template ([#108](https://github.com/google/node-gtoken/pull/108))
- chore: update CI config ([#105](https://github.com/google/node-gtoken/pull/105))
- Update kokoro config ([#103](https://github.com/google/node-gtoken/pull/103))
- Update CI config ([#101](https://github.com/google/node-gtoken/pull/101))
- Don't publish sourcemaps ([#99](https://github.com/google/node-gtoken/pull/99))
- Update kokoro config ([#97](https://github.com/google/node-gtoken/pull/97))
- test: remove appveyor config ([#96](https://github.com/google/node-gtoken/pull/96))
- Update CI config ([#95](https://github.com/google/node-gtoken/pull/95))
- Enable prefer-const in the eslint config ([#94](https://github.com/google/node-gtoken/pull/94))
- Enable no-var in eslint ([#93](https://github.com/google/node-gtoken/pull/93))
- Update CI config ([#92](https://github.com/google/node-gtoken/pull/92))
- Add synth and update CI config ([#91](https://github.com/google/node-gtoken/pull/91))
- Retry npm install in CI ([#90](https://github.com/google/node-gtoken/pull/90))
- chore(deps): update dependency nyc to v13 ([#88](https://github.com/google/node-gtoken/pull/88))
- chore: ignore package-log.json ([#86](https://github.com/google/node-gtoken/pull/86))
- chore: update renovate config ([#83](https://github.com/google/node-gtoken/pull/83))
- chore(deps): lock file maintenance ([#85](https://github.com/google/node-gtoken/pull/85))
- chore: remove greenkeeper badge ([#82](https://github.com/google/node-gtoken/pull/82))
- test: throw on deprecation ([#81](https://github.com/google/node-gtoken/pull/81))
- chore(deps): update dependency typescript to v3 ([#80](https://github.com/google/node-gtoken/pull/80))
- chore: move mocha options to mocha.opts ([#78](https://github.com/google/node-gtoken/pull/78))
- chore(deps): lock file maintenance ([#79](https://github.com/google/node-gtoken/pull/79))
- test: use strictEqual in tests ([#76](https://github.com/google/node-gtoken/pull/76))
- chore(deps): lock file maintenance ([#77](https://github.com/google/node-gtoken/pull/77))
- chore(deps): update dependency typescript to ~2.9.0 ([#75](https://github.com/google/node-gtoken/pull/75))
- chore: Configure Renovate ([#74](https://github.com/google/node-gtoken/pull/74))
- Update gts to the latest version 🚀 ([#73](https://github.com/google/node-gtoken/pull/73))
- Add Code of Conduct
- build: start testing against Node 10 ([#69](https://github.com/google/node-gtoken/pull/69))
- chore(package): update nyc to version 12.0.2 ([#67](https://github.com/google/node-gtoken/pull/67))
- chore(package): update @types/node to version 10.0.3 ([#65](https://github.com/google/node-gtoken/pull/65))

### 2.0.0
New features:
- API now supports callback and promise based workflows

Breaking changes:
- `GoogleToken` is now a class type, and must be instantiated.
- `GoogleToken.expires_at` renamed to `GoogleToken.expiresAt`
- `GoogleToken.raw_token` renamed to `GoogleToken.rawToken`
- `GoogleToken.token_expires` renamed to `GoogleToken.tokenExpires`

