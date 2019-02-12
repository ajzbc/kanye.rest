# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/google-p12-pem?activeTab=versions

## v1.0.3

12-07-2018 09:50 PST

This is a service release very few updates.  The only interesting change is the removal of support for Node.js 4.x and 9.x, both of which are out of LTS support.

### Dependencies
- fix(deps): update dependency pify to v4 ([#62](https://github.com/google/google-p12-pem/pull/62))

### Documentation
- docs: clean up the readme ([#121](https://github.com/google/google-p12-pem/pull/121))

### Internal / Testing Changes
- chore: basic cleanup ([#122](https://github.com/google/google-p12-pem/pull/122))
- chore: always nyc report before calling codecov ([#120](https://github.com/google/google-p12-pem/pull/120))
- chore: nyc ignore build/test by default ([#119](https://github.com/google/google-p12-pem/pull/119))
- chore(build): update templates and synth ([#117](https://github.com/google/google-p12-pem/pull/117))
- fix(build): fix system key decryption ([#112](https://github.com/google/google-p12-pem/pull/112))
- chore(deps): update dependency typescript to ~3.2.0 ([#111](https://github.com/google/google-p12-pem/pull/111))
- chore: add synth.metadata
- chore(deps): update dependency gts to ^0.9.0 ([#106](https://github.com/google/google-p12-pem/pull/106))
- chore: update eslintignore config ([#105](https://github.com/google/google-p12-pem/pull/105))
- chore: use latest npm on Windows ([#104](https://github.com/google/google-p12-pem/pull/104))
- chore: update CircleCI config ([#103](https://github.com/google/google-p12-pem/pull/103))
- chore: include build in eslintignore ([#100](https://github.com/google/google-p12-pem/pull/100))
- chore: update issue templates ([#96](https://github.com/google/google-p12-pem/pull/96))
- chore: remove old issue template ([#94](https://github.com/google/google-p12-pem/pull/94))
- build: run tests on node11 ([#93](https://github.com/google/google-p12-pem/pull/93))
- chores(build): run codecov on continuous builds ([#88](https://github.com/google/google-p12-pem/pull/88))
- chores(build): do not collect sponge.xml from windows builds ([#90](https://github.com/google/google-p12-pem/pull/90))
- chore(deps): update dependency typescript to ~3.1.0 ([#89](https://github.com/google/google-p12-pem/pull/89))
- chore: update new issue template ([#87](https://github.com/google/google-p12-pem/pull/87))
- build: fix codecov uploading on Kokoro ([#84](https://github.com/google/google-p12-pem/pull/84))
- Update kokoro config ([#81](https://github.com/google/google-p12-pem/pull/81))
- Run system tests on Kokoro ([#78](https://github.com/google/google-p12-pem/pull/78))
- Don't publish sourcemaps ([#79](https://github.com/google/google-p12-pem/pull/79))
- test: remove appveyor config ([#77](https://github.com/google/google-p12-pem/pull/77))
- Update CI config ([#76](https://github.com/google/google-p12-pem/pull/76))
- Enable prefer-const in the eslint config ([#75](https://github.com/google/google-p12-pem/pull/75))
- Enable no-var in eslint ([#74](https://github.com/google/google-p12-pem/pull/74))
- Update CI config ([#73](https://github.com/google/google-p12-pem/pull/73))
- Retry npm install in CI ([#71](https://github.com/google/google-p12-pem/pull/71))
- Update CI config ([#69](https://github.com/google/google-p12-pem/pull/69))
- Update CI config ([#68](https://github.com/google/google-p12-pem/pull/68))
- Update github templates and CircleCI config ([#67](https://github.com/google/google-p12-pem/pull/67))
- chore(deps): update dependency nyc to v13 ([#65](https://github.com/google/google-p12-pem/pull/65))
- add synth file and standardize config ([#64](https://github.com/google/google-p12-pem/pull/64))
- chore: ignore package-log.json ([#61](https://github.com/google/google-p12-pem/pull/61))
- chore: update renovate config ([#59](https://github.com/google/google-p12-pem/pull/59))
- chore(deps): lock file maintenance ([#60](https://github.com/google/google-p12-pem/pull/60))
- chore: remove greenkeeper badge ([#58](https://github.com/google/google-p12-pem/pull/58))
- test: throw on deprecation
- chore: move mocha options to mocha.opts ([#54](https://github.com/google/google-p12-pem/pull/54))
- chore(deps): update dependency typescript to v3 ([#56](https://github.com/google/google-p12-pem/pull/56))
- chore(deps): lock file maintenance ([#55](https://github.com/google/google-p12-pem/pull/55))
- chore(deps): lock file maintenance ([#53](https://github.com/google/google-p12-pem/pull/53))
- chore(deps): update dependency gts to ^0.8.0 ([#49](https://github.com/google/google-p12-pem/pull/49))
- test: use strictEqual in tests ([#51](https://github.com/google/google-p12-pem/pull/51))
- chore(deps): update dependency typescript to ~2.9.0 ([#50](https://github.com/google/google-p12-pem/pull/50))
- chore: Configure Renovate ([#48](https://github.com/google/google-p12-pem/pull/48))
- fix: drop support for node.js 4.x and 9.x ([#46](https://github.com/google/google-p12-pem/pull/46))
- Add Code of Conduct
- chore(package): update gts to the latest version ([#45](https://github.com/google/google-p12-pem/pull/45))
- chore(package): update nyc to version 12.0.2 ([#42](https://github.com/google/google-p12-pem/pull/42))
- chore: upgrade to the latest version of all dependencies ([#39](https://github.com/google/google-p12-pem/pull/39))
- chore(build): run lint as a separate job ([#40](https://github.com/google/google-p12-pem/pull/40))
- fix: pin gts version with ^ ([#38](https://github.com/google/google-p12-pem/pull/38))
- chore(package): update @types/node to version 10.0.3 ([#34](https://github.com/google/google-p12-pem/pull/34))
- chore: start testing on node 10 ([#36](https://github.com/google/google-p12-pem/pull/36))
- chore(package): update @types/mocha to version 5.0.0 ([#33](https://github.com/google/google-p12-pem/pull/33))

