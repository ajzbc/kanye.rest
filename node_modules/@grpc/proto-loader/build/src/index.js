"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var Protobuf = require("protobufjs");
var descriptor = require("protobufjs/ext/descriptor");
var fs = require("fs");
var path = require("path");
var camelCase = require("lodash.camelcase");
var descriptorOptions = {
    longs: String,
    enums: String,
    bytes: String,
    defaults: true,
    oneofs: true,
    json: true
};
function joinName(baseName, name) {
    if (baseName === '') {
        return name;
    }
    else {
        return baseName + '.' + name;
    }
}
function isHandledReflectionObject(obj) {
    return obj instanceof Protobuf.Service || obj instanceof Protobuf.Type || obj instanceof Protobuf.Enum;
}
function isNamespaceBase(obj) {
    return obj instanceof Protobuf.Namespace || obj instanceof Protobuf.Root;
}
function getAllHandledReflectionObjects(obj, parentName) {
    var objName = joinName(parentName, obj.name);
    if (isHandledReflectionObject(obj)) {
        return [[objName, obj]];
    }
    else {
        if (isNamespaceBase(obj) && typeof obj.nested !== undefined) {
            return Object.keys(obj.nested).map(function (name) {
                return getAllHandledReflectionObjects(obj.nested[name], objName);
            }).reduce(function (accumulator, currentValue) { return accumulator.concat(currentValue); }, []);
        }
    }
    return [];
}
function createDeserializer(cls, options) {
    return function deserialize(argBuf) {
        return cls.toObject(cls.decode(argBuf), options);
    };
}
function createSerializer(cls) {
    return function serialize(arg) {
        var message = cls.fromObject(arg);
        return cls.encode(message).finish();
    };
}
function createMethodDefinition(method, serviceName, options) {
    /* This is only ever called after the corresponding root.resolveAll(), so we
     * can assume that the resolved request and response types are non-null */
    var requestType = method.resolvedRequestType;
    var responseType = method.resolvedResponseType;
    return {
        path: '/' + serviceName + '/' + method.name,
        requestStream: !!method.requestStream,
        responseStream: !!method.responseStream,
        requestSerialize: createSerializer(requestType),
        requestDeserialize: createDeserializer(requestType, options),
        responseSerialize: createSerializer(responseType),
        responseDeserialize: createDeserializer(responseType, options),
        // TODO(murgatroid99): Find a better way to handle this
        originalName: camelCase(method.name),
        requestType: createMessageDefinition(requestType),
        responseType: createMessageDefinition(responseType)
    };
}
function createServiceDefinition(service, name, options) {
    var def = {};
    for (var _i = 0, _a = service.methodsArray; _i < _a.length; _i++) {
        var method = _a[_i];
        def[method.name] = createMethodDefinition(method, name, options);
    }
    return def;
}
var fileDescriptorCache = new Map();
function getFileDescriptors(root) {
    if (fileDescriptorCache.has(root)) {
        return fileDescriptorCache.get(root);
    }
    else {
        var descriptorList = root.toDescriptor('proto3').file;
        var bufferList = descriptorList.map(function (value) { return Buffer.from(descriptor.FileDescriptorProto.encode(value).finish()); });
        fileDescriptorCache.set(root, bufferList);
        return bufferList;
    }
}
function createMessageDefinition(message) {
    var messageDescriptor = message.toDescriptor('proto3');
    return {
        format: 'Protocol Buffer 3 DescriptorProto',
        type: messageDescriptor.$type.toObject(messageDescriptor, descriptorOptions),
        fileDescriptorProtos: getFileDescriptors(message.root)
    };
}
function createEnumDefinition(enumType) {
    var enumDescriptor = enumType.toDescriptor('proto3');
    return {
        format: 'Protocol Buffer 3 EnumDescriptorProto',
        type: enumDescriptor.$type.toObject(enumDescriptor, descriptorOptions),
        fileDescriptorProtos: getFileDescriptors(enumType.root)
    };
}
/**
 * function createDefinition(obj: Protobuf.Service, name: string, options: Options): ServiceDefinition;
 * function createDefinition(obj: Protobuf.Type, name: string, options: Options): MessageTypeDefinition;
 * function createDefinition(obj: Protobuf.Enum, name: string, options: Options): EnumTypeDefinition;
 */
function createDefinition(obj, name, options) {
    if (obj instanceof Protobuf.Service) {
        return createServiceDefinition(obj, name, options);
    }
    else if (obj instanceof Protobuf.Type) {
        return createMessageDefinition(obj);
    }
    else if (obj instanceof Protobuf.Enum) {
        return createEnumDefinition(obj);
    }
    else {
        throw new Error('Type mismatch in reflection object handling');
    }
}
function createPackageDefinition(root, options) {
    var def = {};
    root.resolveAll();
    for (var _i = 0, _a = getAllHandledReflectionObjects(root, ''); _i < _a.length; _i++) {
        var _b = _a[_i], name = _b[0], obj = _b[1];
        def[name] = createDefinition(obj, name, options);
    }
    return def;
}
function addIncludePathResolver(root, includePaths) {
    var originalResolvePath = root.resolvePath;
    root.resolvePath = function (origin, target) {
        if (path.isAbsolute(target)) {
            return target;
        }
        for (var _i = 0, includePaths_1 = includePaths; _i < includePaths_1.length; _i++) {
            var directory = includePaths_1[_i];
            var fullPath = path.join(directory, target);
            try {
                fs.accessSync(fullPath, fs.constants.R_OK);
                return fullPath;
            }
            catch (err) {
                continue;
            }
        }
        return originalResolvePath(origin, target);
    };
}
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
function load(filename, options) {
    var root = new Protobuf.Root();
    options = options || {};
    if (!!options.includeDirs) {
        if (!(options.includeDirs instanceof Array)) {
            return Promise.reject(new Error('The includeDirs option must be an array'));
        }
        addIncludePathResolver(root, options.includeDirs);
    }
    return root.load(filename, options).then(function (loadedRoot) {
        loadedRoot.resolveAll();
        return createPackageDefinition(root, options);
    });
}
exports.load = load;
function loadSync(filename, options) {
    var root = new Protobuf.Root();
    options = options || {};
    if (!!options.includeDirs) {
        if (!(options.includeDirs instanceof Array)) {
            throw new Error('The include option must be an array');
        }
        addIncludePathResolver(root, options.includeDirs);
    }
    var loadedRoot = root.loadSync(filename, options);
    loadedRoot.resolveAll();
    return createPackageDefinition(root, options);
}
exports.loadSync = loadSync;
//# sourceMappingURL=index.js.map