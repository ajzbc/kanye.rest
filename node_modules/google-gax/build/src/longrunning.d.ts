/// <reference types="node" />
import { EventEmitter } from 'events';
import { APICall, APICallback, CancellablePromise, NormalApiCaller, PromiseCanceller } from './api_callable';
import { BackoffSettings, CallOptions } from './gax';
import { GoogleError } from './GoogleError';
import { Metadata } from './grpc';
import { OperationsClient } from './operations_client';
/**
 * A callback to upack a google.protobuf.Any message.
 * @callback anyDecoder
 * @param {google.protobuf.Any} message - The message to unpacked.
 * @return {Object} - The unpacked message.
 */
export interface AnyDecoder {
    (message: {}): Metadata;
}
/**
 * @callback GetOperationCallback
 * @param {?Error} error
 * @param {?Object} result
 * @param {?Object} metadata
 * @param {?google.longrunning.Operation} rawResponse
 */
export interface GetOperationCallback {
    (err?: Error | null, result?: {}, metadata?: {}, rawResponse?: Operation): void;
}
export declare class LongrunningDescriptor {
    operationsClient: OperationsClient;
    responseDecoder: AnyDecoder;
    metadataDecoder: AnyDecoder;
    /**
     * Describes the structure of a page-streaming call.
     *
     * @property {OperationsClient} operationsClient
     * @property {anyDecoder} responseDecoder
     * @property {anyDecoder} metadataDecoder
     *
     * @param {OperationsClient} operationsClient - The client used to poll or
     *   cancel an operation.
     * @param {anyDecoder=} responseDecoder - The decoder to unpack
     *   the response message.
     * @param {anyDecoder=} metadataDecoder - The decoder to unpack
     *   the metadata message.
     *
     * @constructor
     */
    constructor(operationsClient: OperationsClient, responseDecoder: AnyDecoder, metadataDecoder: AnyDecoder);
    apiCaller(): LongrunningApiCaller;
}
export declare class LongrunningApiCaller extends NormalApiCaller {
    longrunningDescriptor: LongrunningDescriptor;
    /**
     * Creates an API caller that performs polling on a long running operation.
     *
     * @private
     * @constructor
     * @param {LongrunningDescriptor} longrunningDescriptor - Holds the
     * decoders used for unpacking responses and the operationsClient
     * used for polling the operation.
     */
    constructor(longrunningDescriptor: LongrunningDescriptor);
    call(apiCall: APICall, argument: {}, settings: CallOptions, canceller: PromiseCanceller): void;
    _wrapOperation(apiCall: APICall, settings: CallOptions, argument: {}, callback: APICallback): any;
}
export declare class Operation extends EventEmitter {
    completeListeners: number;
    hasActiveListeners: boolean;
    latestResponse: Operation;
    longrunningDescriptor: LongrunningDescriptor;
    result: {} | null;
    metadata: Metadata | null;
    backoffSettings: BackoffSettings;
    _callOptions?: CallOptions;
    currentCallPromise_?: CancellablePromise;
    name?: string;
    done?: boolean;
    error?: GoogleError;
    response?: {
        value: {};
    };
    /**
     * Wrapper for a google.longrunnung.Operation.
     *
     * @constructor
     *
     * @param {google.longrunning.Operation} grpcOp - The operation to be wrapped.
     * @param {LongrunningDescriptor} longrunningDescriptor - This defines the
     * operations service client and unpacking mechanisms for the operation.
     * @param {BackoffSettings} backoffSettings - The backoff settings used in
     * in polling the operation.
     * @param {CallOptions=} callOptions - CallOptions used in making get operation
     * requests.
     */
    constructor(grpcOp: Operation, longrunningDescriptor: LongrunningDescriptor, backoffSettings: BackoffSettings, callOptions?: CallOptions);
    /**
     * Begin listening for events on the operation. This method keeps track of how
     * many "complete" listeners are registered and removed, making sure polling
     * is handled automatically.
     *
     * As long as there is one active "complete" listener, the connection is open.
     * When there are no more listeners, the polling stops.
     *
     * @private
     */
    _listenForEvents(): void;
    /**
     * Cancels current polling api call and cancels the operation.
     *
     * @return {Promise} the promise of the OperationsClient#cancelOperation api
     * request.
     */
    cancel(): any;
    /**
     * Get the updated status of the operation. If the Operation has previously
     * completed, this will use the status of the cached completed operation.
     *
     *   - callback(err): Operation failed
     *   - callback(null, result, metadata, rawResponse): Operation complete
     *   - callback(null, null, metadata, rawResponse): Operation incomplete
     *
     * @param {getOperationCallback} callback - Callback to handle the polled
     * operation result and metadata.
     * @return {Promise|undefined} - This returns a promise if a callback is not specified.
     * The promise resolves to an array where the first element is the unpacked
     * result, the second element is the metadata, and the third element is the
     * raw response of the api call. The promise rejects if the operation returns
     * an error.
     */
    getOperation(): Promise<{}>;
    getOperation(callback: GetOperationCallback): void;
    _unpackResponse(op: Operation, callback?: GetOperationCallback): void;
    /**
     * Poll `getOperation` to check the operation's status. This runs a loop to
     * ping using the backoff strategy specified at initialization.
     *
     * Note: This method is automatically called once a "complete" event handler
     * is registered on the operation.
     *
     * @private
     */
    startPolling_(): void;
    /**
     * Wraps the `complete` and `error` events in a Promise.
     *
     * @return {promise} - Promise that resolves on operation completion and rejects
     * on operation error.
     */
    promise(): Promise<{}>;
}
/**
 * Method used to create Operation objects.
 *
 * @constructor
 *
 * @param {google.longrunning.Operation} op - The operation to be wrapped.
 * @param {LongrunningDescriptor} longrunningDescriptor - This defines the
 * operations service client and unpacking mechanisms for the operation.
 * @param {BackoffSettings} backoffSettings - The backoff settings used in
 * in polling the operation.
 * @param {CallOptions=} callOptions - CallOptions used in making get operation
 * requests.
 */
export declare function operation(op: Operation, longrunningDescriptor: LongrunningDescriptor, backoffSettings: BackoffSettings, callOptions?: CallOptions): Operation;
