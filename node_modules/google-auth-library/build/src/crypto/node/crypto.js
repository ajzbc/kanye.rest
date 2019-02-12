"use strict";
/**
 * Copyright 2019 Google LLC. All Rights Reserved.
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
const crypto = require("crypto");
class NodeCrypto {
    sha256DigestBase64(str) {
        return __awaiter(this, void 0, void 0, function* () {
            return crypto.createHash('sha256').update(str).digest('base64');
        });
    }
    randomBytesBase64(count) {
        return crypto.randomBytes(count).toString('base64');
    }
    verify(pubkey, data, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifier = crypto.createVerify('sha256');
            verifier.update(data);
            return verifier.verify(pubkey, signature, 'base64');
        });
    }
    createSign(algorithm) {
        return crypto.createSign(algorithm);
    }
    decodeBase64StringUtf8(base64) {
        return Buffer.from(base64, 'base64').toString('utf-8');
    }
    encodeBase64StringUtf8(text) {
        return Buffer.from(text, 'utf-8').toString('base64');
    }
}
exports.NodeCrypto = NodeCrypto;
//# sourceMappingURL=crypto.js.map