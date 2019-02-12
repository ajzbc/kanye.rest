import { GoogleError } from './GoogleError';
/**
 * @callback GetCredentialsFunc
 *
 * To authorize requests through gRPC, we must get the raw google-auth-library
 * auth client object.
 *
 * @param {function()} callback - The callback function.
 * @param {Object} opts - options values for configuring auth
 * @param {(String|String[])} opts.scopes - the scope or scopes to use when
 *   obtaining the credentials.
 * @param {Object} opts.sslCreds - when specified, this is used instead
 *   of default credentials.
 */
/**
 * Creates a promise which resolves a auth credential.
 *
 * @param {GetCredentialsFunc} getCredentials - the callback used to
 *   obtain the credentials.
 * @param {Object} opts - the optional arguments to be passed to
 *   getCredentials.
 * @return {Promise} A promise which resolves to the credential.
 */
export declare function createCredPromise(getCredentials: GetCredentialsFunc, opts?: {}): Promise<{}>;
export declare type GetCredentialsCallback = (err: GoogleError | null, credentials: {}) => void;
export declare type GetCredentialsFunc = (callback: GetCredentialsCallback, opts?: {}) => void;
