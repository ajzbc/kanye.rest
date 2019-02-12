/// <reference types="node" />
import { NormalApiCaller, APICall, PromiseCanceller, APICallback } from './api_callable';
import { CallSettings } from './gax';
/**
 * Compute the identifier of the `obj`. The objects of the same ID
 * will be bundled together.
 *
 * @param {Object} obj - The request object.
 * @param {String[]} discriminatorFields - The array of field names.
 *   A field name may include '.' as a separator, which is used to
 *   indicate object traversal.
 * @return {String|undefined} - the identifier string, or undefined if any
 *   discriminator.
 *   fields do not exist.
 */
export declare function computeBundleId(obj: {}, discriminatorFields: string[]): string | undefined;
export interface SubResponseInfo {
    field: string;
    start?: number;
    end?: number;
}
export interface TaskElement {
}
export interface TaskData {
    elements: TaskElement[];
    bytes: number;
    callback: TaskCallback;
    cancelled?: boolean;
}
export interface TaskCallback extends APICallback {
    id?: string;
}
/**
 * Creates a deep copy of the object with the consideration of subresponse
 * fields for bundling.
 *
 * @param {Object} obj - The source object.
 * @param {Object?} subresponseInfo - The information to copy the subset of
 *   the field for the response. Do nothing if it's null.
 * @param {String} subresponseInfo.field - The field name.
 * @param {number} subresponseInfo.start - The offset where the copying
 *   element should starts with.
 * @param {number} subresponseInfo.end - The ending index where the copying
 *   region of the elements ends.
 * @return {Object} The copied object.
 * @private
 */
export declare function deepCopyForResponse(obj: any, subresponseInfo: SubResponseInfo | null): any;
export declare class Task {
    _apiCall: APICall;
    _request: {
        [index: string]: TaskElement[];
    };
    _bundledField: string;
    _subresponseField?: string | null;
    _data: TaskData[];
    callCanceller?: PromiseCanceller;
    /**
     * A task coordinates the execution of a single bundle.
     *
     * @param {function} apiCall - The function to conduct calling API.
     * @param {Object} bundlingRequest - The base request object to be used
     *   for the actual API call.
     * @param {string} bundledField - The name of the field in bundlingRequest
     *   to be bundled.
     * @param {string=} subresponseField - The name of the field in the response
     *   to be passed to the callback.
     * @constructor
     * @private
     */
    constructor(apiCall: APICall, bundlingRequest: {}, bundledField: string, subresponseField?: string | null);
    /**
     * Returns the number of elements in a task.
     * @return {number} The number of elements.
     */
    getElementCount(): number;
    /**
     * Returns the total byte size of the elements in a task.
     * @return {number} The byte size.
     */
    getRequestByteSize(): number;
    /**
     * Invokes the actual API call with current elements.
     * @return {string[]} - the list of ids for invocations to be run.
     */
    run(): string[];
    /**
     * Appends the list of elements into the task.
     * @param {Object[]} elements - the new list of elements.
     * @param {number} bytes - the byte size required to encode elements in the API.
     * @param {APICallback} callback - the callback of the method call.
     */
    extend(elements: TaskElement[], bytes: number, callback: TaskCallback): void;
    /**
     * Cancels a part of elements.
     * @param {string} id - The identifier of the part of elements.
     * @return {boolean} Whether the entire task will be canceled or not.
     */
    cancel(id: string): boolean;
}
export interface BundleOptions {
    elementCountLimit: number;
    requestByteLimit: number;
    elementCountThreshold: number;
    requestByteThreshold: number;
    delayThreshold: number;
}
export declare class BundleExecutor {
    _options: BundleOptions;
    _descriptor: BundleDescriptor;
    _tasks: {
        [index: string]: Task;
    };
    _timers: {
        [index: string]: NodeJS.Timer;
    };
    _invocations: {
        [index: string]: string;
    };
    _invocationId: number;
    /**
     * Organizes requests for an api service that requires to bundle them.
     *
     * @param {BundleOptions} bundleOptions - configures strategy this instance
     *   uses when executing bundled functions.
     * @param {BundleDescriptor} bundleDescriptor - the description of the bundling.
     * @constructor
     */
    constructor(bundleOptions: BundleOptions, bundleDescriptor: BundleDescriptor);
    /**
     * Schedule a method call.
     *
     * @param {function} apiCall - the function for an API call.
     * @param {Object} request - the request object to be bundled with others.
     * @param {APICallback} callback - the callback to be called when the method finished.
     * @return {function()} - the function to cancel the scheduled invocation.
     */
    schedule(apiCall: APICall, request: {
        [index: string]: Array<{}> | string;
    }, callback?: TaskCallback): any;
    /**
     * Clears scheduled timeout if it exists.
     *
     * @param {String} bundleId - the id for the task whose timeout needs to be
     *   cleared.
     * @private
     */
    _maybeClearTimeout(bundleId: string): void;
    /**
     * Cancels an event.
     *
     * @param {String} id - The id for the event in the task.
     * @private
     */
    _cancel(id: string): void;
    /**
     * Invokes a task.
     *
     * @param {String} bundleId - The id for the task.
     * @private
     */
    _runNow(bundleId: string): void;
}
export declare class Bundleable extends NormalApiCaller {
    bundler: BundleExecutor;
    /**
     * Creates an API caller that bundles requests.
     *
     * @private
     * @constructor
     * @param {BundleExecutor} bundler - bundles API calls.
     */
    constructor(bundler: BundleExecutor);
    call(apiCall: APICall, argument: {}, settings: CallSettings, status: any): void;
}
export declare class BundleDescriptor {
    bundledField: string;
    requestDiscriminatorFields: string[];
    subresponseField: string | null;
    byteLengthFunction: Function;
    /**
     * Describes the structure of bundled call.
     *
     * requestDiscriminatorFields may include '.' as a separator, which is used to
     * indicate object traversal. This allows fields in nested objects to be used
     * to determine what request to bundle.
     *
     * @property {String} bundledField
     * @property {String} requestDiscriminatorFields
     * @property {String} subresponseField
     * @property {Function} byteLengthFunction
     *
     * @param {String} bundledField - the repeated field in the request message
     *   that will have its elements aggregated by bundling.
     * @param {String} requestDiscriminatorFields - a list of fields in the
     *   target request message class that are used to detemrine which request
     *   messages should be bundled together.
     * @param {String} subresponseField - an optional field, when present it
     *   indicates the field in the response message that should be used to
     *   demultiplex the response into multiple response messages.
     * @param {Function} byteLengthFunction - a function to obtain the byte
     *   length to be consumed for the bundled field messages. Because Node.JS
     *   protobuf.js/gRPC uses builtin Objects for the user-visible data and
     *   internally they are encoded/decoded in protobuf manner, this function
     *   is actually necessary to calculate the byte length.
     * @constructor
     */
    constructor(bundledField: string, requestDiscriminatorFields: string[], subresponseField: string | null, byteLengthFunction: Function);
    /**
     * Returns a new API caller.
     * @private
     * @param {CallSettings} settings - the current settings.
     * @return {Bundleable} - the new bundling API caller.
     */
    apiCaller(settings: CallSettings): Bundleable;
}
