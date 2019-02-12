var stream = require("readable-stream");

var BunWrapper = function BunWrapper(options) {
  options = options || {};

  if (Array.isArray(options)) {
    options = {streams: options};
  }

  options.objectMode = true;

  stream.Duplex.call(this, options);

  var self = this;

  // grab a copy of the streams array
  this._streams = (options.streams || []).slice();

  // we need at least one stream to do things
  if (this._streams.length === 0) {
    this._streams.push(new stream.PassThrough({objectMode: true}));
  }

  // default: true
  this._bubbleErrors = (typeof options.bubbleErrors === "undefined") || !!options.bubbleErrors;

  // error bubbling! yay!
  if (this._bubbleErrors) {
    for (var i=0;i<this._streams.length;++i) {
      this._streams[i].on("error", function(e) {
        return self.emit("error", e);
      });
    }
  }

  // 0 -> 1, 1 -> 2, ..., n-1 -> n
  for (var i=0;i<this._streams.length-1;++i) {
    this._streams[i].pipe(this._streams[i+1]);
  }

  // these might actually be the same. that's ok.
  this._first = this._streams[0];
  this._last  = this._streams[this._streams.length-1];

  // .on("data") is supported again in 0.11 and has always worked in 0.10
  this._last.on("data", function(e) {
    if (!self.push(e)) {
      self._last.pause();
    }
  });

  // this is the readable side of our pipe ending
  this._last.on("end", function() {
    self.push(null);
  });

  // and here's the writable side finishing
  this._first.on("finish", function() {
    self.end();
  });

  // proxy through the .end() action
  this.on("finish", function() {
    self._first.end();
  });
};
BunWrapper.prototype = Object.create(stream.Duplex.prototype, {constructor: {value: BunWrapper}});

BunWrapper.prototype._write = function _write(input, encoding, done) {
  this._first.write(input, done);
};

BunWrapper.prototype._read = function _read(n) {
  this._last.resume();
};

// factory function
var bun = module.exports = function bun(options, streams) {
  if (Array.isArray(options)) {
    var tmp = streams;
    streams = options;
    options = tmp;
  }

  options = options || {};

  options.streams = options.streams || streams;

  return new BunWrapper(options);
};

bun.BunWrapper = BunWrapper;
