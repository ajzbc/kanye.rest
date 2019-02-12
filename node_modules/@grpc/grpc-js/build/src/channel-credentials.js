"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tls_1 = require("tls");
const call_credentials_1 = require("./call-credentials");
// tslint:disable-next-line:no-any
function verifyIsBufferOrNull(obj, friendlyName) {
    if (obj && !(obj instanceof Buffer)) {
        throw new TypeError(`${friendlyName}, if provided, must be a Buffer.`);
    }
}
/**
 * A class that contains credentials for communicating over a channel, as well
 * as a set of per-call credentials, which are applied to every method call made
 * over a channel initialized with an instance of this class.
 */
class ChannelCredentials {
    constructor(callCredentials) {
        this.callCredentials = callCredentials || call_credentials_1.CallCredentials.createEmpty();
    }
    /**
     * Gets the set of per-call credentials associated with this instance.
     */
    _getCallCredentials() {
        return this.callCredentials;
    }
    /**
     * Return a new ChannelCredentials instance with a given set of credentials.
     * The resulting instance can be used to construct a Channel that communicates
     * over TLS.
     * @param rootCerts The root certificate data.
     * @param privateKey The client certificate private key, if available.
     * @param certChain The client certificate key chain, if available.
     */
    static createSsl(rootCerts, privateKey, certChain, verifyOptions) {
        verifyIsBufferOrNull(rootCerts, 'Root certificate');
        verifyIsBufferOrNull(privateKey, 'Private key');
        verifyIsBufferOrNull(certChain, 'Certificate chain');
        if (privateKey && !certChain) {
            throw new Error('Private key must be given with accompanying certificate chain');
        }
        if (!privateKey && certChain) {
            throw new Error('Certificate chain must be given with accompanying private key');
        }
        const secureContext = tls_1.createSecureContext({
            ca: rootCerts || undefined,
            key: privateKey || undefined,
            cert: certChain || undefined
        });
        const connectionOptions = { secureContext };
        if (verifyOptions && verifyOptions.checkServerIdentity) {
            connectionOptions.checkServerIdentity =
                (host, cert) => {
                    return verifyOptions.checkServerIdentity(host, { raw: cert.raw });
                };
        }
        return new SecureChannelCredentialsImpl(connectionOptions);
    }
    /**
     * Return a new ChannelCredentials instance with no credentials.
     */
    static createInsecure() {
        return new InsecureChannelCredentialsImpl();
    }
}
exports.ChannelCredentials = ChannelCredentials;
class InsecureChannelCredentialsImpl extends ChannelCredentials {
    constructor(callCredentials) {
        super(callCredentials);
    }
    compose(callCredentials) {
        throw new Error('Cannot compose insecure credentials');
    }
    _getConnectionOptions() {
        return null;
    }
    _isSecure() {
        return false;
    }
}
class SecureChannelCredentialsImpl extends ChannelCredentials {
    constructor(connectionOptions, callCredentials) {
        super(callCredentials);
        this.connectionOptions = connectionOptions;
    }
    compose(callCredentials) {
        const combinedCallCredentials = this.callCredentials.compose(callCredentials);
        return new SecureChannelCredentialsImpl(this.connectionOptions, combinedCallCredentials);
    }
    _getConnectionOptions() {
        return this.connectionOptions;
    }
    _isSecure() {
        return true;
    }
}
//# sourceMappingURL=channel-credentials.js.map