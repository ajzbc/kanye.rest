# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/gcs-resumable-upload?activeTab=versions

## v0.14.1

01-25-2019 10:39 PST
  
### Implementation Changes

- fix: return GaxiosError directly ([#171](https://github.com/googleapis/gcs-resumable-upload/pull/171))

### Documentation

- build: exclude googleapis in 404 check. ([#172](https://github.com/googleapis/gcs-resumable-upload/pull/172))
- build: exclude googleapis.com checks in 404 checker ([#170](https://github.com/googleapis/gcs-resumable-upload/pull/170))

## v0.14.0

01-23-2019 17:57 PST

### New Features
- feat: support async functions ([#164](https://github.com/googleapis/gcs-resumable-upload/pull/164))
- fix: use the reject handler for promises ([#144](https://github.com/googleapis/gcs-resumable-upload/pull/144))
- feat: add progress events ([#135](https://github.com/googleapis/gcs-resumable-upload/pull/135))

### Dependencies
- fix(deps): update dependency google-auth-library to v3 ([#165](https://github.com/googleapis/gcs-resumable-upload/pull/165))
- refactor: use teeny-request (part 1) ([#141](https://github.com/googleapis/gcs-resumable-upload/pull/141))
- chore(deps): update dependency @types/configstore to v4 ([#145](https://github.com/googleapis/gcs-resumable-upload/pull/145))
- chore(deps): update dependency typescript to ~3.2.0 ([#140](https://github.com/googleapis/gcs-resumable-upload/pull/140))
- chore(deps): update dependency gts to ^0.9.0 ([#137](https://github.com/googleapis/gcs-resumable-upload/pull/137))
- chore(deps): update dependency through2 to v3 ([#131](https://github.com/googleapis/gcs-resumable-upload/pull/131))
- refactor: move from axios back to request ([#123](https://github.com/googleapis/gcs-resumable-upload/pull/123))
- chore(deps): update dependency nock to v10 ([#113](https://github.com/googleapis/gcs-resumable-upload/pull/113))
- chore: update the version of typescript ([#106](https://github.com/googleapis/gcs-resumable-upload/pull/106))

### Documentation
- build: ignore googleapis.com in doc link checker ([#166](https://github.com/googleapis/gcs-resumable-upload/pull/166))
- build: check broken links in generated docs ([#162](https://github.com/googleapis/gcs-resumable-upload/pull/162))

### Internal / Testing Changes
- fix: fix the unit tests ([#161](https://github.com/googleapis/gcs-resumable-upload/pull/161))
- chore(build): inject yoshi automation key ([#160](https://github.com/googleapis/gcs-resumable-upload/pull/160))
- chore: update nyc and eslint configs ([#159](https://github.com/googleapis/gcs-resumable-upload/pull/159))
- chore: fix publish.sh permission +x ([#156](https://github.com/googleapis/gcs-resumable-upload/pull/156))
- fix(build): fix Kokoro release script ([#155](https://github.com/googleapis/gcs-resumable-upload/pull/155))
- build: add Kokoro configs for autorelease ([#154](https://github.com/googleapis/gcs-resumable-upload/pull/154))
- chore: always nyc report before calling codecov ([#153](https://github.com/googleapis/gcs-resumable-upload/pull/153))
- chore: nyc ignore build/test by default ([#152](https://github.com/googleapis/gcs-resumable-upload/pull/152))
- chore: update synth and common config ([#150](https://github.com/googleapis/gcs-resumable-upload/pull/150))
- fix(build): fix system key decryption ([#142](https://github.com/googleapis/gcs-resumable-upload/pull/142))
- chore: add synth.metadata
- chore: update eslintignore config ([#136](https://github.com/googleapis/gcs-resumable-upload/pull/136))
- chore: use latest npm on Windows ([#134](https://github.com/googleapis/gcs-resumable-upload/pull/134))
- chore: update CircleCI config ([#129](https://github.com/googleapis/gcs-resumable-upload/pull/129))
- chore: include build in eslintignore ([#126](https://github.com/googleapis/gcs-resumable-upload/pull/126))
- chore: update issue templates ([#121](https://github.com/googleapis/gcs-resumable-upload/pull/121))
- chore: remove old issue template ([#119](https://github.com/googleapis/gcs-resumable-upload/pull/119))
- build: run tests on node11 ([#118](https://github.com/googleapis/gcs-resumable-upload/pull/118))
- chores(build): run codecov on continuous builds ([#112](https://github.com/googleapis/gcs-resumable-upload/pull/112))
- chores(build): do not collect sponge.xml from windows builds ([#114](https://github.com/googleapis/gcs-resumable-upload/pull/114))
- chore: update new issue template ([#111](https://github.com/googleapis/gcs-resumable-upload/pull/111))
- build: fix codecov uploading on Kokoro ([#108](https://github.com/googleapis/gcs-resumable-upload/pull/108))
- Update kokoro config ([#105](https://github.com/googleapis/gcs-resumable-upload/pull/105))
- Update CI config ([#103](https://github.com/googleapis/gcs-resumable-upload/pull/103))
- Update kokoro config ([#101](https://github.com/googleapis/gcs-resumable-upload/pull/101))
- test: remove appveyor config ([#100](https://github.com/googleapis/gcs-resumable-upload/pull/100))
- Update kokoro config ([#99](https://github.com/googleapis/gcs-resumable-upload/pull/99))
- Enable prefer-const in the eslint config ([#98](https://github.com/googleapis/gcs-resumable-upload/pull/98))
- Enable no-var in eslint ([#97](https://github.com/googleapis/gcs-resumable-upload/pull/97))
- Update to new repo location ([#96](https://github.com/googleapis/gcs-resumable-upload/pull/96))
- Update CI config ([#95](https://github.com/googleapis/gcs-resumable-upload/pull/95))

## v0.13.0

### Dependencies
- fix(deps): update dependency google-auth-library to v2 (#89)
- chore(deps): update dependency nyc to v13 (#86)

### Docs
- docs: update the README (#79)

### Internal / Testing Changes
- Retry npm install in CI (#92)
- Update CI config (#90)
- Update CI config (#88)
- Update the CI config (#85)
- chore: update CircleCI config
- chore: ignore package-lock.json (#83)
- chore: update renovate config (#81)
- chore: enable noImplicitThis (#82)
- chore: enable CI and synth script (#77)

## v0.12.0

### Implemenation Changes
BREAKING CHANGE:
- chore: drop support for node.js 4 (#75)

### Dependencies
- chore(deps): update dependency gts to ^0.8.0 (#71)
- fix(deps): update dependency configstore to v4 (#72)
- chore(deps): update dependency typescript to v3 (#74)

### Internal / Testing Changes
- chore: make it OSPO compliant (#73)
- fix: quarantine axios types (#70)

