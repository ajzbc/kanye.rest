"use strict";
/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
const gcpMetadata = require("gcp-metadata");
const messages = require("../messages");
const oauth2client_1 = require("./oauth2client");
class Compute extends oauth2client_1.OAuth2Client {
    /**
     * Google Compute Engine service account credentials.
     *
     * Retrieve access token from the metadata server.
     * See: https://developers.google.com/compute/docs/authentication
     */
    constructor(options = {}) {
        super(options);
        // Start with an expired refresh token, which will automatically be
        // refreshed before the first API call is made.
        this.credentials = { expiry_date: 1, refresh_token: 'compute-placeholder' };
        this.serviceAccountEmail = options.serviceAccountEmail || 'default';
    }
    /**
     * Indicates whether the credential requires scopes to be created by calling
     * createdScoped before use.
     * @deprecated
     * @return Boolean indicating if scope is required.
     */
    createScopedRequired() {
        // On compute engine, scopes are specified at the compute instance's
        // creation time, and cannot be changed. For this reason, always return
        // false.
        messages.warn(messages.COMPUTE_CREATE_SCOPED_DEPRECATED);
        return false;
    }
    /**
     * Refreshes the access token.
     * @param refreshToken Unused parameter
     */
    refreshTokenNoCache(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenPath = `service-accounts/${this.serviceAccountEmail}/token`;
            let data;
            try {
                data = yield gcpMetadata.instance(tokenPath);
            }
            catch (e) {
                e.message = 'Could not refresh access token.';
                throw e;
            }
            const tokens = data;
            if (data && data.expires_in) {
                tokens.expiry_date = ((new Date()).getTime() + (data.expires_in * 1000));
                delete tokens.expires_in;
            }
            this.emit('tokens', tokens);
            return { tokens, res: null };
        });
    }
    requestAsync(opts, retry = false) {
        return super.requestAsync(opts, retry).catch(e => {
            const res = e.response;
            if (res && res.status) {
                let helpfulMessage = null;
                if (res.status === 403) {
                    helpfulMessage =
                        'A Forbidden error was returned while attempting to retrieve an access ' +
                            'token for the Compute Engine built-in service account. This may be because the Compute ' +
                            'Engine instance does not have the correct permission scopes specified.';
                }
                else if (res.status === 404) {
                    helpfulMessage =
                        'A Not Found error was returned while attempting to retrieve an access' +
                            'token for the Compute Engine built-in service account. This may be because the Compute ' +
                            'Engine instance does not have any permission scopes specified.';
                }
                if (helpfulMessage) {
                    if (e && e.message && !retry) {
                        helpfulMessage += ' ' + e.message;
                    }
                    if (e) {
                        e.message = helpfulMessage;
                    }
                    else {
                        e = new Error(helpfulMessage);
                        e.code = res.status.toString();
                    }
                }
            }
            throw e;
        });
    }
}
exports.Compute = Compute;
//# sourceMappingURL=computeclient.js.map