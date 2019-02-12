/**
 * Helpers for constructing routing headers.
 *
 * These headers are used by Google infrastructure to determine how to route
 * requests, especially for services that are regional.
 *
 * Generally, these headers are specified as gRPC metadata.
 */
/**
 * Constructs the routing header from the given params
 *
 * @param {Object} params - the request header parameters.
 * @return {string} the routing header value.
 */
export declare function fromParams(params: {
    [index: string]: {};
}): string;
