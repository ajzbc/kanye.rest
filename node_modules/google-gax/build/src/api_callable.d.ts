import { CallSettings } from './gax';
import { GoogleError } from './GoogleError';
export interface ArgumentFunction {
    (argument: {}, callback: APICallback): void;
}
/**
 * @callback APICallback
 * @param {?Error} error
 * @param {?Object} response
 */
export declare type APICallback = (err: GoogleError | null, response?: any, next?: {} | null, rawResponse?: {} | null) => void;
/**
 * @callback APIFunc
 * @param {Object} argument
 * @param {grpc.Metadata} metadata
 * @param {Object} options
 * @param {APICallback} callback
 */
export declare type APIFunc = (argument: {}, metadata: {}, options: {}, callback: APICallback) => Canceller;
/**
 * @callback APICall
 * @param {Object} argument
 * @param {CallOptions} callOptions
 * @param {APICallback} callback
 * @return {Promise|Stream|undefined}
 */
export interface APICall {
    (argument?: {} | null, callOptions?: {} | null, callback?: APICallback): any;
}
export declare class Canceller {
    callback?: APICallback;
    cancelFunc?: () => void;
    completed: boolean;
    /**
     * Canceller manages callback, API calls, and cancellation
     * of the API calls.
     * @param {APICallback=} callback
     *   The callback to be called asynchronously when the API call
     *   finishes.
     * @constructor
     * @property {APICallback} callback
     *   The callback function to be called.
     * @private
     */
    constructor(callback?: APICallback);
    /**
     * Cancels the ongoing promise.
     */
    cancel(): void;
    /**
     * Call calls the specified function. Result will be used to fulfill
     * the promise.
     *
     * @param {function(Object, APICallback=)} aFunc
     *   A function for an API call.
     * @param {Object} argument
     *   A request object.
     */
    call(aFunc: (obj: {}, callback: APICallback) => PromiseCanceller, argument: {}): void;
}
export interface CancellablePromise<T = any> extends Promise<T> {
    cancel(): void;
}
export declare class PromiseCanceller<T = any> extends Canceller {
    promise: CancellablePromise<T>;
    /**
     * PromiseCanceller is Canceller, but it holds a promise when
     * the API call finishes.
     * @param {Function} PromiseCtor - A constructor for a promise that implements
     * the ES6 specification of promise.
     * @constructor
     * @private
     */
    constructor(PromiseCtor: PromiseConstructor);
}
export interface ApiCallOtherArgs {
    options?: {
        deadline?: Date;
    };
    headers?: {};
    metadataBuilder: (abTests?: {}, headers?: {}) => {};
}
export interface NormalApiCallerSettings {
    promise: PromiseConstructor;
}
/**
 * Creates an API caller for normal methods.
 *
 * @private
 * @constructor
 */
export declare class NormalApiCaller {
    init(settings: NormalApiCallerSettings, callback: APICallback): PromiseCanceller | Canceller;
    wrap(func: Function): Function;
    call(apiCall: APICall, argument: {}, settings: {}, canceller: PromiseCanceller): void;
    fail(canceller: PromiseCanceller, err: GoogleError): void;
    result(canceller: PromiseCanceller): CancellablePromise<any> | undefined;
}
/**
 * Converts an rpc call into an API call governed by the settings.
 *
 * In typical usage, `func` will be a promsie to a callable used to make an rpc
 * request. This will mostly likely be a bound method from a request stub used
 * to make an rpc call. It is not a direct function but a Promise instance,
 * because of its asynchronism (typically, obtaining the auth information).
 *
 * The result is a function which manages the API call with the given settings
 * and the options on the invocation.
 *
 * @param {Promise.<APIFunc>} funcWithAuth - is a promise to be used to make
 *   a bare rpc call. This is a Promise instead of a bare function because
 *   the rpc call will be involeved with asynchronous authentications.
 * @param {CallSettings} settings - provides the settings for this call
 * @param {Object=} optDescriptor - optionally specify the descriptor for
 *   the method call.
 * @return {APICall} func - a bound method on a request stub used
 *   to make an rpc call.
 */
export declare function createApiCall(funcWithAuth: Promise<APIFunc>, settings: CallSettings, optDescriptor?: any): APICall;
