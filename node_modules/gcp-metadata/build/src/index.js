"use strict";
/**
 * Copyright 2018 Google LLC
 *
 * Distributed under MIT license.
 * See file LICENSE for detail or copy at https://opensource.org/licenses/MIT
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const gaxios_1 = require("gaxios");
const jsonBigint = require('json-bigint');
exports.HOST_ADDRESS = 'http://metadata.google.internal';
exports.BASE_PATH = '/computeMetadata/v1';
exports.BASE_URL = exports.HOST_ADDRESS + exports.BASE_PATH;
exports.HEADER_NAME = 'Metadata-Flavor';
exports.HEADER_VALUE = 'Google';
exports.HEADERS = Object.freeze({ [exports.HEADER_NAME]: exports.HEADER_VALUE });
// Accepts an options object passed from the user to the API. In previous
// versions of the API, it referred to a `Request` or an `Axios` request
// options object.  Now it refers to an object with very limited property
// names. This is here to help ensure users don't pass invalid options when
// they  upgrade from 0.4 to 0.5 to 0.8.
function validate(options) {
    Object.keys(options).forEach(key => {
        switch (key) {
            case 'params':
            case 'property':
            case 'headers':
                break;
            case 'qs':
                throw new Error(`'qs' is not a valid configuration option. Please use 'params' instead.`);
            default:
                throw new Error(`'${key}' is not a valid configuration option.`);
        }
    });
}
function metadataAccessor(type, options, noResponseRetries = 3) {
    return __awaiter(this, void 0, void 0, function* () {
        options = options || {};
        if (typeof options === 'string') {
            options = { property: options };
        }
        let property = '';
        if (typeof options === 'object' && options.property) {
            property = '/' + options.property;
        }
        validate(options);
        try {
            const res = yield gaxios_1.request({
                url: `${exports.BASE_URL}/${type}${property}`,
                headers: Object.assign({}, exports.HEADERS, options.headers),
                retryConfig: { noResponseRetries },
                params: options.params
            });
            // NOTE: node.js converts all incoming headers to lower case.
            if (res.headers[exports.HEADER_NAME.toLowerCase()] !== exports.HEADER_VALUE) {
                throw new Error(`Invalid response from metadata service: incorrect ${exports.HEADER_NAME} header.`);
            }
            else if (!res.data) {
                throw new Error('Invalid response from the metadata service');
            }
            if (typeof res.data === 'string') {
                try {
                    return jsonBigint.parse(res.data);
                }
                catch (_a) {
                    /* ignore */
                }
            }
            return res.data;
        }
        catch (e) {
            if (e.response && e.response.status !== 200) {
                e.message = `Unsuccessful response status code. ${e.message}`;
            }
            throw e;
        }
    });
}
// tslint:disable-next-line no-any
function instance(options) {
    return metadataAccessor('instance', options);
}
exports.instance = instance;
// tslint:disable-next-line no-any
function project(options) {
    return metadataAccessor('project', options);
}
exports.project = project;
/**
 * Determine if the metadata server is currently available.
 */
function isAvailable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Attempt to read instance metadata. As configured, this will
            // retry 3 times if there is a valid response, and fail fast
            // if there is an ETIMEDOUT or ENOTFOUND error.
            yield metadataAccessor('instance', undefined, 0);
            return true;
        }
        catch (err) {
            // Failure to resolve the metadata service means that it is not available.
            if (err.code && (err.code === 'ENOTFOUND' || err.code === 'ENOENT')) {
                return false;
            }
            // Throw unexpected errors.
            throw err;
        }
    });
}
exports.isAvailable = isAvailable;
//# sourceMappingURL=index.js.map