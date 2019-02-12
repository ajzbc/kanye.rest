/**
 * Copyright 2014 Google Inc. All Rights Reserved.
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
export interface PromisifyAllOptions extends PromisifyOptions {
    /**
     * Array of methods to ignore when promisifying.
     */
    exclude?: string[];
}
export interface PromisifyOptions {
    /**
     * Resolve the promise with single arg instead of an array.
     */
    singular?: boolean;
}
export interface PromiseMethod extends Function {
    promisified_?: boolean;
}
export interface WithPromise {
    Promise?: PromiseConstructor;
}
/**
 * Wraps a callback style function to conditionally return a promise.
 *
 * @param {function} originalMethod - The method to promisify.
 * @param {object=} options - Promise options.
 * @param {boolean} options.singular - Resolve the promise with single arg instead of an array.
 * @return {function} wrapped
 */
export declare function promisify(originalMethod: PromiseMethod, options?: PromisifyOptions): any;
/**
 * Promisifies certain Class methods. This will not promisify private or
 * streaming methods.
 *
 * @param {module:common/service} Class - Service class.
 * @param {object=} options - Configuration object.
 */
export declare function promisifyAll(Class: Function, options?: PromisifyAllOptions): void;
