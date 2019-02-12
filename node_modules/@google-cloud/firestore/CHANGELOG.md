# Changelog

[npm history][1]

[1]: https://www.npmjs.com/package/@google-cloud/firestore?activeTab=versions

## v1.0.1

01-29-2019 14:02 PST

# Documentation

- doc: update README.md to show this library as GA ([#532](https://github.com/googleapis/nodejs-firestore/pull/532))
- fix(samples): constructor doesn't need project or cred options ([#533](https://github.com/googleapis/nodejs-firestore/pull/533))

## v1.0.0

01-29-2019 12:12 PST

This is the Firestore Node.js Client Library GA release.

## v0.21.0

01-25-2019 12:21 PST

This release brings in google-gax update to 0.24.0 which had its dependency google-auth-library updated to 3.0.0^ that swaps out axios in favour of gaxios and addresses an issue using the library behind a proxy (https://github.com/googleapis/nodejs-firestore/issues/493).

### Dependencies
- chore(deps): update dependency ts-node to v8 ([#526](https://github.com/googleapis/nodejs-firestore/pull/526))
- fix(deps): update dependency google-gax to ^0.24.0 ([#529](https://github.com/googleapis/nodejs-firestore/pull/529))

### Documentation
- build: ignore googleapis.com in doc link check ([#527](https://github.com/googleapis/nodejs-firestore/pull/527))
- docs: fix import links in the jsdocs ([#524](https://github.com/googleapis/nodejs-firestore/pull/524))

### Internal / Testing Changes
- chore: update year in the license headers. ([#523](https://github.com/googleapis/nodejs-firestore/pull/523))

## v0.20.0

01-16-2019 13:14 PST

#### BREAKING: The `timestampsInSnapshots` default has changed to true.
The `timestampsInSnapshots` setting is now enabled by default so timestamp
fields read from a `DocumentSnapshot` will be returned as `Timestamp` objects
instead of `Date`. Any code expecting to receive a `Date` object must be
updated.

#### DEPRECATED: `Firestore.v1beta1` replaced by `Firestore.v1`
If you are currently using `Firestore.v1beta1.FirestoreClient`, you must switch
to `Firestore.v1.FirestoreClient`. No other changes should be required as the
API is 100% identical.

### Bug Fixes
- fix: getAll function signature to allow array destructuring ([#515](https://github.com/googleapis/nodejs-firestore/pull/515))
- fix: update grpc retry config ([#464](https://github.com/googleapis/nodejs-firestore/pull/464))

### New Features
- feat: update to v1 protos ([#516](https://github.com/googleapis/nodejs-firestore/pull/516))
- feat: add additional field transform types ([#521](https://github.com/googleapis/nodejs-firestore/pull/521))

### Dependencies
- fix(deps): update dependency google-gax to ^0.23.0 ([#518](https://github.com/googleapis/nodejs-firestore/pull/518))

### Documentation
- fix(docs): remove unused long running operations types
- docs: elaborate on QuerySnapshot.forEach ([#480](https://github.com/googleapis/nodejs-firestore/pull/480))
- docs: update doc writetime ([#475](https://github.com/googleapis/nodejs-firestore/pull/475))
- docs: Fix example for writeTime ([#474](https://github.com/googleapis/nodejs-firestore/pull/474))
- chore: update license file ([#473](https://github.com/googleapis/nodejs-firestore/pull/473))
- docs: update readme badges ([#470](https://github.com/googleapis/nodejs-firestore/pull/470))

### Internal / Testing Changes
- build: check broken links in generated docs ([#511](https://github.com/googleapis/nodejs-firestore/pull/511))
- chore(build): inject yoshi automation key ([#492](https://github.com/googleapis/nodejs-firestore/pull/492))
- chore: update nyc and eslint configs ([#491](https://github.com/googleapis/nodejs-firestore/pull/491))
- chore: fix publish.sh permission +x ([#489](https://github.com/googleapis/nodejs-firestore/pull/489))
- fix(build): fix Kokoro release script ([#488](https://github.com/googleapis/nodejs-firestore/pull/488))
- build: add Kokoro configs for autorelease ([#487](https://github.com/googleapis/nodejs-firestore/pull/487))
- chore: add synth.metadata ([#485](https://github.com/googleapis/nodejs-firestore/pull/485))
- chore: always nyc report before calling codecov ([#482](https://github.com/googleapis/nodejs-firestore/pull/482))
- chore: nyc ignore build/test by default ([#479](https://github.com/googleapis/nodejs-firestore/pull/479))
- chore(build): update the prettier config ([#476](https://github.com/googleapis/nodejs-firestore/pull/476))
- chore(deps): update dependency typescript to ~3.2.0 ([#467](https://github.com/googleapis/nodejs-firestore/pull/467))
- fix(build): fix system key decryption ([#468](https://github.com/googleapis/nodejs-firestore/pull/468))
- Adding array-contains to error message ([#465](https://github.com/googleapis/nodejs-firestore/pull/465))

## v0.17.0

### Implementation Changes
- Regenerate library with synth.py customizations ([#345](https://github.com/googleapis/nodejs-firestore/pull/345))
  - contains some documentation and internal timeout changes
- Converting backoff.js to TypeScript ([#328](https://github.com/googleapis/nodejs-firestore/pull/328))
- Making .dotChanges a method ([#324](https://github.com/googleapis/nodejs-firestore/pull/324))

### Dependencies
- chore(deps): update dependency nyc to v13 ([#329](https://github.com/googleapis/nodejs-firestore/pull/329))
- fix(deps): update dependency google-gax to ^0.19.0 ([#325](https://github.com/googleapis/nodejs-firestore/pull/325))

### Documentation
- Fix DocumentReference.get() docs ([#332](https://github.com/googleapis/nodejs-firestore/pull/332))

### Internal / Testing Changes
- Retry npm install in CI ([#341](https://github.com/googleapis/nodejs-firestore/pull/341))
- make synth.py generate library to ./dev ([#337](https://github.com/googleapis/nodejs-firestore/pull/337))
- Revert "Re-generate library using /synth.py ([#331](https://github.com/googleapis/nodejs-firestore/pull/331))" ([#334](https://github.com/googleapis/nodejs-firestore/pull/334))
- Re-generate library using /synth.py ([#331](https://github.com/googleapis/nodejs-firestore/pull/331))

