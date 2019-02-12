/// <reference types="node" />
/**
 * @license
 * Copyright 2018 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import * as Protobuf from 'protobufjs';
import * as descriptor from 'protobufjs/ext/descriptor';
declare module 'protobufjs' {
    interface Type {
        toDescriptor(protoVersion: string): Protobuf.Message<descriptor.IDescriptorProto> & descriptor.IDescriptorProto;
    }
    interface Root {
        toDescriptor(protoVersion: string): Protobuf.Message<descriptor.IFileDescriptorSet> & descriptor.IFileDescriptorSet;
    }
    interface Enum {
        toDescriptor(protoVersion: string): Protobuf.Message<descriptor.IEnumDescriptorProto> & descriptor.IEnumDescriptorProto;
    }
}
export interface Serialize<T> {
    (value: T): Buffer;
}
export interface Deserialize<T> {
    (bytes: Buffer): T;
}
export interface ProtobufTypeDefinition {
    format: string;
    type: object;
    fileDescriptorProtos: Buffer[];
}
export interface MessageTypeDefinition extends ProtobufTypeDefinition {
    format: 'Protocol Buffer 3 DescriptorProto';
}
export interface EnumTypeDefinition extends ProtobufTypeDefinition {
    format: 'Protocol Buffer 3 EnumDescriptorProto';
}
export interface MethodDefinition<RequestType, ResponseType> {
    path: string;
    requestStream: boolean;
    responseStream: boolean;
    requestSerialize: Serialize<RequestType>;
    responseSerialize: Serialize<ResponseType>;
    requestDeserialize: Deserialize<RequestType>;
    responseDeserialize: Deserialize<ResponseType>;
    originalName?: string;
    requestType: MessageTypeDefinition;
    responseType: MessageTypeDefinition;
}
export interface ServiceDefinition {
    [index: string]: MethodDefinition<object, object>;
}
export declare type AnyDefinition = ServiceDefinition | MessageTypeDefinition | EnumTypeDefinition;
export interface PackageDefinition {
    [index: string]: AnyDefinition;
}
export declare type Options = Protobuf.IParseOptions & Protobuf.IConversionOptions & {
    includeDirs?: string[];
};
/**
 * Load a .proto file with the specified options.
 * @param filename The file path to load. Can be an absolute path or relative to
 *     an include path.
 * @param options.keepCase Preserve field names. The default is to change them
 *     to camel case.
 * @param options.longs The type that should be used to represent `long` values.
 *     Valid options are `Number` and `String`. Defaults to a `Long` object type
 *     from a library.
 * @param options.enums The type that should be used to represent `enum` values.
 *     The only valid option is `String`. Defaults to the numeric value.
 * @param options.bytes The type that should be used to represent `bytes`
 *     values. Valid options are `Array` and `String`. The default is to use
 *     `Buffer`.
 * @param options.defaults Set default values on output objects. Defaults to
 *     `false`.
 * @param options.arrays Set empty arrays for missing array values even if
 *     `defaults` is `false`. Defaults to `false`.
 * @param options.objects Set empty objects for missing object values even if
 *     `defaults` is `false`. Defaults to `false`.
 * @param options.oneofs Set virtual oneof properties to the present field's
 *     name
 * @param options.includeDirs Paths to search for imported `.proto` files.
 */
export declare function load(filename: string, options?: Options): Promise<PackageDefinition>;
export declare function loadSync(filename: string, options?: Options): PackageDefinition;
