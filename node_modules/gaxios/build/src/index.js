"use strict";
// Copyright 2018, Google, LLC.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const gaxios_1 = require("./gaxios");
exports.Gaxios = gaxios_1.Gaxios;
var common_1 = require("./common");
exports.GaxiosError = common_1.GaxiosError;
/**
 * The default instance used when the `request` method is directly
 * invoked.
 */
exports.instance = new gaxios_1.Gaxios();
/**
 * Make an HTTP request using the given options.
 * @param opts Options for the request
 */
function request(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        return exports.instance.request(opts);
    });
}
exports.request = request;
//# sourceMappingURL=index.js.map