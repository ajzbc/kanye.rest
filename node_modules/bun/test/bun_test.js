var stream = require("readable-stream");

var bun = require("..");

var assert = require("assert");

describe("bun", function() {
  it("should be the best", function() {
    var bun = "is the best";

    assert.strictEqual(bun, "is the best");
  });

  it("should pass data through one stream", function(done) {
    var uppercaser = new stream.Transform({objectMode: true});

    uppercaser._transform = function _transform(input, encoding, done) {
      this.push(input.toString().toUpperCase());
      return done();
    };

    var stack = bun([uppercaser]);

    stack.on("readable", function() {
      var data = stack.read();

      assert(typeof data === "string", "data should be a string");
      assert(data === "HELLO", "data should be transformed correctly");

      done();
    });

    stack.write("hello");
  });

  it("should pass data through two streams", function(done) {
    var uppercaser  = new stream.Transform({objectMode: true}),
        underscorer = new stream.Transform({objectMode: true});

    uppercaser._transform = function _transform(input, encoding, done) {
      this.push(input.toString().toUpperCase());
      return done();
    };

    underscorer._transform = function _transform(input, encoding, done) {
      this.push(input.toString().split("").join("_"));
      return done();
    };

    var stack = bun([uppercaser, underscorer]);

    stack.on("readable", function() {
      var data = stack.read();

      assert(typeof data === "string", "data should be a string");
      assert(data === "H_E_L_L_O", "data should be transformed correctly");

      done();
    });

    stack.write("hello");
  });

  it("should finish correctly with no streams and no data written", function(done) {
    var stack = bun([]);

    stack.on("finish", function() {
      done();
    });

    stack.end();
  });

  it("should finish correctly with one stream and no data written", function(done) {
    var alice = new stream.PassThrough({objectMode: true});

    var stack = bun([alice]);

    stack.on("finish", function() {
      done();
    });

    stack.end();
  });

  it("should finish correctly with two streams and no data written", function(done) {
    var alice = new stream.PassThrough({objectMode: true}),
        bob   = new stream.PassThrough({objectMode: true});

    var stack = bun([alice, bob]);

    stack.on("finish", function() {
      done();
    });

    stack.end();
  });

  it("should finish correctly with no streams and some data written", function(done) {
    var stack = bun([]);

    stack.on("finish", function() {
      done();
    });

    stack.on("readable", function() {
      var e;
      while (e = stack.read()) {
      }
    });

    stack.write("some data");
    stack.end();
  });

  it("should finish correctly with one stream and some data written", function(done) {
    var alice = new stream.PassThrough({objectMode: true});

    var stack = bun([alice]);

    stack.on("finish", function() {
      done();
    });

    stack.on("readable", function() {
      var e;
      while (e = stack.read()) {
      }
    });

    stack.write("some data");
    stack.end();
  });

  it("should finish correctly with two streams and some data written", function(done) {
    var alice = new stream.PassThrough({objectMode: true}),
        bob   = new stream.PassThrough({objectMode: true});

    var stack = bun([alice, bob]);

    stack.on("finish", function() {
      done();
    });

    stack.on("readable", function() {
      var e;
      while (e = stack.read()) {
      }
    });

    stack.write("some data");
    stack.end();
  });

  it("should finish correctly when piped through with no streams and no data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var stack = bun([]);

    stack.on("finish", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.end();
  });

  it("should finish correctly when piped through with one stream and no data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var alice = new stream.PassThrough({objectMode: true});

    var stack = bun([alice]);

    stack.on("finish", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.end();
  });

  it("should finish correctly when piped through with two streams and no data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var alice = new stream.PassThrough({objectMode: true}),
        bob   = new stream.PassThrough({objectMode: true});

    var stack = bun([alice, bob]);

    stack.on("finish", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.end();
  });

  it("should finish correctly when piped through with no streams and some data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var stack = bun([]);

    stack.on("finish", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.write("hello");
    input.end();
  });

  it("should finish correctly when piped through with one stream and some data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var alice = new stream.PassThrough({objectMode: true});

    var stack = bun([alice]);

    stack.on("finish", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.write("hello");
    input.end();
  });

  it("should finish correctly when piped through with two streams and some data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var alice = new stream.PassThrough({objectMode: true}),
        bob   = new stream.PassThrough({objectMode: true});

    var stack = bun([alice, bob]);

    stack.on("finish", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.write("hello");
    input.end();
  });

  it("should end correctly when piped through with no streams and no data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var stack = bun([]);

    stack.on("end", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.push(null);
  });

  it("should end correctly when piped through with one stream and no data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var alice = new stream.PassThrough({objectMode: true});

    var stack = bun([alice]);

    stack.on("end", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.end();
  });

  it("should end correctly when piped through with two streams and no data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var alice = new stream.PassThrough({objectMode: true}),
        bob   = new stream.PassThrough({objectMode: true});

    var stack = bun([alice, bob]);

    stack.on("end", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.end();
  });

  it("should end correctly when piped through with no streams and some data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var stack = bun([]);

    stack.on("end", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.write("hello");
    input.end();
  });

  it("should end correctly when piped through with one stream and some data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var alice = new stream.PassThrough({objectMode: true});

    var stack = bun([alice]);

    stack.on("end", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.write("hello");
    input.end();
  });

  it("should end correctly when piped through with two streams and some data written", function(done) {
    var input = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var alice = new stream.PassThrough({objectMode: true}),
        bob   = new stream.PassThrough({objectMode: true});

    var stack = bun([alice, bob]);

    stack.on("end", function() {
      done();
    });

    input.pipe(stack).pipe(nowhere);
    input.write("hello");
    input.end();
  });

  it("should end wrapped streams correctly when ended", function(done) {
    var alice = new stream.PassThrough({objectMode: true});

    alice.on("finish", function() {
      done();
    });

    var stack = bun([alice]);

    stack.end();
  });

  it("should finish when wrapped streams finish", function(done) {
    var alice = new stream.PassThrough({objectMode: true}),
        outside = new stream.PassThrough({objectMode: true});

    var stack = bun([alice]);

    stack.on("finish", function() {
      done();
    });

    outside.pipe(stack).pipe(outside);

    alice.end();
  });

  it("should end when wrapped streams end", function(done) {
    var alice = new stream.PassThrough({objectMode: true});
    var nowhere = new stream.Writable({objectMode: true});
    nowhere._write = function _write(input, encoding, done) { return done(); };

    var stack = bun([alice]);

    stack.on("end", function() {
      done();
    });

    stack.pipe(nowhere);

    alice.push(null);
  });

  it("should forward errors if bubbleErrors is not specified", function(done) {
    var alice = new stream.PassThrough();

    var stack = bun([alice]);

    stack.on("error", function(err) {
      return done();
    });

    alice.emit("error", Error("test error"));
  });

  it("should forward errors if bubbleErrors is true", function(done) {
    var alice = new stream.PassThrough();

    var stack = bun([alice], {bubbleErrors: true});

    stack.on("error", function(err) {
      return done();
    });

    alice.emit("error", Error("test error"));
  });

  it("should not forward errors if bubbleErrors is false", function(done) {
    var alice = new stream.PassThrough();

    var stack = bun([alice], {bubbleErrors: false});

    var timeout = setTimeout(done, 10);

    stack.on("error", function(err) {
      clearTimeout(timeout);

      return done(Error("shouldn't have bubbled the error"));
    });

    alice.on("error", function(err) {
      // prevent uncaught error crash
    });

    alice.emit("error", Error("test error"));
  });
});
