"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const call_1 = require("./call");
const channel_1 = require("./channel");
const constants_1 = require("./constants");
const metadata_1 = require("./metadata");
// This symbol must be exported (for now).
// See: https://github.com/Microsoft/TypeScript/issues/20080
exports.kChannel = Symbol();
/**
 * A generic gRPC client. Primarily useful as a base class for all generated
 * clients.
 */
class Client {
    constructor(address, credentials, options = {}) {
        if (options.channelOverride) {
            this[exports.kChannel] = options.channelOverride;
        }
        else if (options.channelFactoryOverride) {
            this[exports.kChannel] =
                options.channelFactoryOverride(address, credentials, options);
        }
        else {
            this[exports.kChannel] = new channel_1.Http2Channel(address, credentials, options);
        }
    }
    close() {
        this[exports.kChannel].close();
    }
    getChannel() {
        return this[exports.kChannel];
    }
    waitForReady(deadline, callback) {
        const checkState = (err) => {
            if (err) {
                callback(new Error('Failed to connect before the deadline'));
                return;
            }
            let newState;
            try {
                newState = this[exports.kChannel].getConnectivityState(true);
            }
            catch (e) {
                callback(new Error('The channel has been closed'));
                return;
            }
            if (newState === channel_1.ConnectivityState.READY) {
                callback();
            }
            else {
                try {
                    this[exports.kChannel].watchConnectivityState(newState, deadline, checkState);
                }
                catch (e) {
                    callback(new Error('The channel has been closed'));
                }
            }
        };
        setImmediate(checkState);
    }
    handleUnaryResponse(call, deserialize, callback) {
        let responseMessage = null;
        call.on('data', (data) => {
            if (responseMessage != null) {
                call.cancelWithStatus(constants_1.Status.INTERNAL, 'Too many responses received');
            }
            try {
                responseMessage = deserialize(data);
            }
            catch (e) {
                call.cancelWithStatus(constants_1.Status.INTERNAL, 'Failed to parse server response');
            }
        });
        call.on('end', () => {
            if (responseMessage == null) {
                call.cancelWithStatus(constants_1.Status.INTERNAL, 'Not enough responses received');
            }
        });
        call.on('status', (status) => {
            /* We assume that call emits status after it emits end, and that it
             * accounts for any cancelWithStatus calls up until it emits status.
             * Therefore, considering the above event handlers, status.code should be
             * OK if and only if we have a non-null responseMessage */
            if (status.code === constants_1.Status.OK) {
                callback(null, responseMessage);
            }
            else {
                const error = Object.assign(new Error(status.details), status);
                callback(error);
            }
        });
    }
    checkOptionalUnaryResponseArguments(arg1, arg2, arg3) {
        if (arg1 instanceof Function) {
            return { metadata: new metadata_1.Metadata(), options: {}, callback: arg1 };
        }
        else if (arg2 instanceof Function) {
            if (arg1 instanceof metadata_1.Metadata) {
                return { metadata: arg1, options: {}, callback: arg2 };
            }
            else {
                return { metadata: new metadata_1.Metadata(), options: arg1, callback: arg2 };
            }
        }
        else {
            if (!((arg1 instanceof metadata_1.Metadata) && (arg2 instanceof Object) &&
                (arg3 instanceof Function))) {
                throw new Error('Incorrect arguments passed');
            }
            return { metadata: arg1, options: arg2, callback: arg3 };
        }
    }
    makeUnaryRequest(method, serialize, deserialize, argument, metadata, options, callback) {
        ({ metadata, options, callback } =
            this.checkOptionalUnaryResponseArguments(metadata, options, callback));
        const call = this[exports.kChannel].createCall(method, options.deadline, options.host, options.parent, options.propagate_flags);
        if (options.credentials) {
            call.setCredentials(options.credentials);
        }
        const message = serialize(argument);
        const writeObj = { message };
        call.sendMetadata(metadata);
        call.write(writeObj);
        call.end();
        this.handleUnaryResponse(call, deserialize, callback);
        return new call_1.ClientUnaryCallImpl(call);
    }
    makeClientStreamRequest(method, serialize, deserialize, metadata, options, callback) {
        ({ metadata, options, callback } =
            this.checkOptionalUnaryResponseArguments(metadata, options, callback));
        const call = this[exports.kChannel].createCall(method, options.deadline, options.host, options.parent, options.propagate_flags);
        if (options.credentials) {
            call.setCredentials(options.credentials);
        }
        call.sendMetadata(metadata);
        this.handleUnaryResponse(call, deserialize, callback);
        return new call_1.ClientWritableStreamImpl(call, serialize);
    }
    checkMetadataAndOptions(arg1, arg2) {
        let metadata;
        let options;
        if (arg1 instanceof metadata_1.Metadata) {
            metadata = arg1;
            if (arg2) {
                options = arg2;
            }
            else {
                options = {};
            }
        }
        else {
            if (arg1) {
                options = arg1;
            }
            else {
                options = {};
            }
            metadata = new metadata_1.Metadata();
        }
        return { metadata, options };
    }
    makeServerStreamRequest(method, serialize, deserialize, argument, metadata, options) {
        ({ metadata, options } = this.checkMetadataAndOptions(metadata, options));
        const call = this[exports.kChannel].createCall(method, options.deadline, options.host, options.parent, options.propagate_flags);
        if (options.credentials) {
            call.setCredentials(options.credentials);
        }
        const message = serialize(argument);
        const writeObj = { message };
        call.sendMetadata(metadata);
        call.write(writeObj);
        call.end();
        return new call_1.ClientReadableStreamImpl(call, deserialize);
    }
    makeBidiStreamRequest(method, serialize, deserialize, metadata, options) {
        ({ metadata, options } = this.checkMetadataAndOptions(metadata, options));
        const call = this[exports.kChannel].createCall(method, options.deadline, options.host, options.parent, options.propagate_flags);
        if (options.credentials) {
            call.setCredentials(options.credentials);
        }
        call.sendMetadata(metadata);
        return new call_1.ClientDuplexStreamImpl(call, serialize, deserialize);
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map