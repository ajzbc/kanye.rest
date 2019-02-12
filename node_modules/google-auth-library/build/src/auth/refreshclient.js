"use strict";
/**
 * Copyright 2015 Google Inc. All Rights Reserved.
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
const oauth2client_1 = require("./oauth2client");
class UserRefreshClient extends oauth2client_1.OAuth2Client {
    constructor(optionsOrClientId, clientSecret, refreshToken, eagerRefreshThresholdMillis) {
        const opts = (optionsOrClientId && typeof optionsOrClientId === 'object') ?
            optionsOrClientId :
            {
                clientId: optionsOrClientId,
                clientSecret,
                refreshToken,
                eagerRefreshThresholdMillis
            };
        super({
            clientId: opts.clientId,
            clientSecret: opts.clientSecret,
            eagerRefreshThresholdMillis: opts.eagerRefreshThresholdMillis
        });
        this._refreshToken = opts.refreshToken;
    }
    /**
     * Refreshes the access token.
     * @param refreshToken An ignored refreshToken..
     * @param callback Optional callback.
     */
    refreshTokenNoCache(refreshToken) {
        const _super = Object.create(null, {
            refreshTokenNoCache: { get: () => super.refreshTokenNoCache }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return _super.refreshTokenNoCache.call(this, this._refreshToken);
        });
    }
    /**
     * Create a UserRefreshClient credentials instance using the given input
     * options.
     * @param json The input object.
     */
    fromJSON(json) {
        if (!json) {
            throw new Error('Must pass in a JSON object containing the user refresh token');
        }
        if (json.type !== 'authorized_user') {
            throw new Error('The incoming JSON object does not have the "authorized_user" type');
        }
        if (!json.client_id) {
            throw new Error('The incoming JSON object does not contain a client_id field');
        }
        if (!json.client_secret) {
            throw new Error('The incoming JSON object does not contain a client_secret field');
        }
        if (!json.refresh_token) {
            throw new Error('The incoming JSON object does not contain a refresh_token field');
        }
        this._clientId = json.client_id;
        this._clientSecret = json.client_secret;
        this._refreshToken = json.refresh_token;
        this.credentials.refresh_token = json.refresh_token;
    }
    fromStream(inputStream, callback) {
        if (callback) {
            this.fromStreamAsync(inputStream).then(r => callback(), callback);
        }
        else {
            return this.fromStreamAsync(inputStream);
        }
    }
    fromStreamAsync(inputStream) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!inputStream) {
                    return reject(new Error('Must pass in a stream containing the user refresh token.'));
                }
                let s = '';
                inputStream.setEncoding('utf8')
                    .on('error', reject)
                    .on('data', (chunk) => s += chunk)
                    .on('end', () => {
                    try {
                        const data = JSON.parse(s);
                        this.fromJSON(data);
                        return resolve();
                    }
                    catch (err) {
                        return reject(err);
                    }
                });
            });
        });
    }
}
exports.UserRefreshClient = UserRefreshClient;
//# sourceMappingURL=refreshclient.js.map