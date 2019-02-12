"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const stream_1 = require("stream");
const constants_1 = require("./constants");
class ClientUnaryCallImpl extends events_1.EventEmitter {
    constructor(call) {
        super();
        this.call = call;
        call.on('metadata', (metadata) => {
            this.emit('metadata', metadata);
        });
        call.on('status', (status) => {
            this.emit('status', status);
        });
    }
    cancel() {
        this.call.cancelWithStatus(constants_1.Status.CANCELLED, 'Cancelled on client');
    }
    getPeer() {
        return this.call.getPeer();
    }
}
exports.ClientUnaryCallImpl = ClientUnaryCallImpl;
function setUpReadableStream(stream, call, deserialize) {
    let statusEmitted = false;
    call.on('data', (data) => {
        let deserialized;
        try {
            deserialized = deserialize(data);
        }
        catch (e) {
            call.cancelWithStatus(constants_1.Status.INTERNAL, 'Failed to parse server response');
            return;
        }
        if (!stream.push(deserialized)) {
            call.pause();
        }
    });
    call.on('end', () => {
        if (statusEmitted) {
            stream.push(null);
        }
        else {
            call.once('status', () => {
                stream.push(null);
            });
        }
    });
    call.on('status', (status) => {
        if (status.code !== constants_1.Status.OK) {
            const error = Object.assign(new Error(status.details), status);
            stream.emit('error', error);
        }
        stream.emit('status', status);
        statusEmitted = true;
    });
    call.pause();
}
class ClientReadableStreamImpl extends stream_1.Readable {
    constructor(call, deserialize) {
        super({ objectMode: true });
        this.call = call;
        this.deserialize = deserialize;
        call.on('metadata', (metadata) => {
            this.emit('metadata', metadata);
        });
        setUpReadableStream(this, call, deserialize);
    }
    cancel() {
        this.call.cancelWithStatus(constants_1.Status.CANCELLED, 'Cancelled on client');
    }
    getPeer() {
        return this.call.getPeer();
    }
    _read(_size) {
        this.call.resume();
    }
}
exports.ClientReadableStreamImpl = ClientReadableStreamImpl;
function tryWrite(call, serialize, chunk, encoding, cb) {
    let message;
    const flags = Number(encoding);
    try {
        message = serialize(chunk);
    }
    catch (e) {
        call.cancelWithStatus(constants_1.Status.INTERNAL, 'Serialization failure');
        cb(e);
        return;
    }
    const writeObj = { message };
    if (!Number.isNaN(flags)) {
        writeObj.flags = flags;
    }
    call.write(writeObj, cb);
}
class ClientWritableStreamImpl extends stream_1.Writable {
    constructor(call, serialize) {
        super({ objectMode: true });
        this.call = call;
        this.serialize = serialize;
        call.on('metadata', (metadata) => {
            this.emit('metadata', metadata);
        });
        call.on('status', (status) => {
            this.emit('status', status);
        });
    }
    cancel() {
        this.call.cancelWithStatus(constants_1.Status.CANCELLED, 'Cancelled on client');
    }
    getPeer() {
        return this.call.getPeer();
    }
    _write(chunk, encoding, cb) {
        tryWrite(this.call, this.serialize, chunk, encoding, cb);
    }
    _final(cb) {
        this.call.end();
        cb();
    }
}
exports.ClientWritableStreamImpl = ClientWritableStreamImpl;
class ClientDuplexStreamImpl extends stream_1.Duplex {
    constructor(call, serialize, deserialize) {
        super({ objectMode: true });
        this.call = call;
        this.serialize = serialize;
        this.deserialize = deserialize;
        call.on('metadata', (metadata) => {
            this.emit('metadata', metadata);
        });
        setUpReadableStream(this, call, deserialize);
    }
    cancel() {
        this.call.cancelWithStatus(constants_1.Status.CANCELLED, 'Cancelled on client');
    }
    getPeer() {
        return this.call.getPeer();
    }
    _read(_size) {
        this.call.resume();
    }
    _write(chunk, encoding, cb) {
        tryWrite(this.call, this.serialize, chunk, encoding, cb);
    }
    _final(cb) {
        this.call.end();
        cb();
    }
}
exports.ClientDuplexStreamImpl = ClientDuplexStreamImpl;
//# sourceMappingURL=call.js.map