bun  ![build status][build_status]
===

We've all pondered, "But what do I do with it?" The answer is universal: Wrap it
in a bun! **bun** wraps a series of streams into a single
`stream.Duplex`-compliant unit.

A Possible And Likely Scenario
------------------------------

Say you have an existing module with an implentation like this

```js
// my-transport.js
encryptor.pipe(compressor).pipe(socket).pipe(decompressor).pipe(decryptor);
```

Totally believable, right? Now each time someone wants to use your module, you
have to do something like this

```js
// too much work!
client.pipe(encryptor)
      .pipe(compressor)
      .pipe(socket)
      .pipe(decompressor)
      .pipe(decryptor)
      .pipe(client);
```

Gross! Puke! This is horribly inconvenient and ugly for the end user! Let's look
at a **better solution**

```js
// defined in my-transport.js
var bun = require("bun");
module.service = function(socket) {
  return bun([encryptor, compressor, socket, decompressor, decryptor]);
});

// used in client
var transport = require("./my-transport");
client.pipe(transport.service(socket)).pipe(client);
```

Hot cross buns! **bun** is amazing!


Example
-------

```js
var  stream = require("stream"),
     bun    = require("bun");

// stream generator
var createStream = function createStream(id) {
  var s = new stream.Transform({encoding: "utf8"});
  s._transform = function _transform(str, encoding, done) {
    this.push("(" + id + " " + str + ")");
    done();
  };
  return s;
};

// create some streams
var streams = ["G", "O", "D"].map(function(id) {
  return createStream(id);
});

// wrap the streams in a bun!
var hotdog = bun(streams);

// connect hotdog to stdout
hotdog.pipe(process.stdout);

// use the hotdog
hotdog.write("in a bun"); // (D (O (G in a bun)))
```

Buns are convenient, edible, and keep your hands clean! Use **bun**!


API
---

**bun**

```js
var service = bun(streams, [options]);
```

* _streams_ - An array of `stream` objects.
* _options_ - An object specifying options. (options are optional)

Options:

* _bubbleErrors_ - Bubble "error" events from wrapped streams up to the outer
  stream, giving you an easy way to aggregate and react to all the errors
  emitted by them in one place. Default is `true`.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 

[build_status]: https://travis-ci.org/naomik/bun.png
