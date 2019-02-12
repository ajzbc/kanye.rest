#!/usr/bin/env node
var  stream = require("readable-stream"),
     bun    = require("./lib/bun");

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
