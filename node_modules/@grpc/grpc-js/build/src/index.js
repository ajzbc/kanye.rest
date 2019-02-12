"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const semver = require("semver");
const call_credentials_1 = require("./call-credentials");
const channel_credentials_1 = require("./channel-credentials");
const client_1 = require("./client");
exports.Client = client_1.Client;
const constants_1 = require("./constants");
exports.logVerbosity = constants_1.LogVerbosity;
exports.status = constants_1.Status;
const logging = require("./logging");
const make_client_1 = require("./make-client");
exports.loadPackageDefinition = make_client_1.loadPackageDefinition;
exports.makeClientConstructor = make_client_1.makeClientConstructor;
exports.makeGenericClientConstructor = make_client_1.makeClientConstructor;
const metadata_1 = require("./metadata");
exports.Metadata = metadata_1.Metadata;
const status_builder_1 = require("./status-builder");
exports.StatusBuilder = status_builder_1.StatusBuilder;
const supportedNodeVersions = '^8.11.2 || >=9.4';
if (!semver.satisfies(process.version, supportedNodeVersions)) {
    throw new Error(`@grpc/grpc-js only works on Node ${supportedNodeVersions}`);
}
function mixin(...sources) {
    const result = {};
    for (const source of sources) {
        for (const propName of Object.getOwnPropertyNames(source)) {
            const property = source[propName]; // tslint:disable-line no-any
            if (typeof property === 'function') {
                result[propName] = property;
            }
        }
    }
    return result;
}
/**** Client Credentials ****/
// Using assign only copies enumerable properties, which is what we want
exports.credentials = mixin({
    /**
     * Create a gRPC credential from a Google credential object.
     * @param googleCredentials The authentication client to use.
     * @return The resulting CallCredentials object.
     */
    createFromGoogleCredential: (googleCredentials) => {
        return call_credentials_1.CallCredentials.createFromMetadataGenerator((options, callback) => {
            // google-auth-library pre-v2.0.0 does not have getRequestHeaders
            // but has getRequestMetadata, which is deprecated in v2.0.0
            let getHeaders;
            if (typeof googleCredentials.getRequestHeaders === 'function') {
                getHeaders =
                    googleCredentials.getRequestHeaders(options.service_url);
            }
            else {
                getHeaders = new Promise((resolve, reject) => {
                    googleCredentials.getRequestMetadata(options.service_url, (err, headers) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(headers);
                    });
                });
            }
            getHeaders.then(headers => {
                const metadata = new metadata_1.Metadata();
                metadata.add('authorization', headers.Authorization);
                callback(null, metadata);
            }, err => {
                callback(err);
            });
        });
    },
    /**
     * Combine a ChannelCredentials with any number of CallCredentials into a
     * single ChannelCredentials object.
     * @param channelCredentials The ChannelCredentials object.
     * @param callCredentials Any number of CallCredentials objects.
     * @return The resulting ChannelCredentials object.
     */
    combineChannelCredentials: (channelCredentials, ...callCredentials) => {
        return callCredentials.reduce((acc, other) => acc.compose(other), channelCredentials);
    },
    /**
     * Combine any number of CallCredentials into a single CallCredentials
     * object.
     * @param first The first CallCredentials object.
     * @param additional Any number of additional CallCredentials objects.
     * @return The resulting CallCredentials object.
     */
    combineCallCredentials: (first, ...additional) => {
        return additional.reduce((acc, other) => acc.compose(other), first);
    }
}, channel_credentials_1.ChannelCredentials, call_credentials_1.CallCredentials);
/**
 * Close a Client object.
 * @param client The client to close.
 */
exports.closeClient = (client) => client.close();
exports.waitForClientReady = (client, deadline, callback) => client.waitForReady(deadline, callback);
/**** Unimplemented function stubs ****/
/* tslint:disable:no-any variable-name */
exports.loadObject = (value, options) => {
    throw new Error('Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead');
};
exports.load = (filename, format, options) => {
    throw new Error('Not available in this library. Use @grpc/proto-loader and loadPackageDefinition instead');
};
exports.setLogger = (logger) => {
    logging.setLogger(logger);
};
exports.setLogVerbosity = (verbosity) => {
    logging.setLoggerVerbosity(verbosity);
};
exports.Server = (options) => {
    throw new Error('Not yet implemented');
};
exports.ServerCredentials = {
    createSsl: (rootCerts, keyCertPairs, checkClientCertificate) => {
        throw new Error('Not yet implemented');
    },
    createInsecure: () => {
        throw new Error('Not yet implemented');
    }
};
exports.getClientChannel = (client) => {
    return client_1.Client.prototype.getChannel.call(client);
};
exports.ListenerBuilder = () => {
    throw new Error('Not yet implemented');
};
exports.InterceptorBuilder = () => {
    throw new Error('Not yet implemented');
};
exports.InterceptingCall = () => {
    throw new Error('Not yet implemented');
};
//# sourceMappingURL=index.js.map