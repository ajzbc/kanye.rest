/// <reference types="node" />
import { EventEmitter } from 'events';
import { Duplex, Readable, Writable } from 'stream';
import { Call, StatusObject } from './call-stream';
import { EmitterAugmentation1 } from './events';
import { Metadata } from './metadata';
import { ObjectReadable, ObjectWritable } from './object-stream';
/**
 * A type extending the built-in Error object with additional fields.
 */
export declare type ServiceError = StatusObject & Error;
/**
 * A base type for all user-facing values returned by client-side method calls.
 */
export declare type SurfaceCall = {
    cancel(): void;
    getPeer(): string;
} & EmitterAugmentation1<'metadata', Metadata> & EmitterAugmentation1<'status', StatusObject> & EventEmitter;
/**
 * A type representing the return value of a unary method call.
 */
export declare type ClientUnaryCall = SurfaceCall;
/**
 * A type representing the return value of a server stream method call.
 */
export declare type ClientReadableStream<ResponseType> = {
    deserialize: (chunk: Buffer) => ResponseType;
} & SurfaceCall & ObjectReadable<ResponseType>;
/**
 * A type representing the return value of a client stream method call.
 */
export declare type ClientWritableStream<RequestType> = {
    serialize: (value: RequestType) => Buffer;
} & SurfaceCall & ObjectWritable<RequestType>;
/**
 * A type representing the return value of a bidirectional stream method call.
 */
export declare type ClientDuplexStream<RequestType, ResponseType> = ClientWritableStream<RequestType> & ClientReadableStream<ResponseType>;
export declare class ClientUnaryCallImpl extends EventEmitter implements ClientUnaryCall {
    private readonly call;
    constructor(call: Call);
    cancel(): void;
    getPeer(): string;
}
export declare class ClientReadableStreamImpl<ResponseType> extends Readable implements ClientReadableStream<ResponseType> {
    private readonly call;
    readonly deserialize: (chunk: Buffer) => ResponseType;
    constructor(call: Call, deserialize: (chunk: Buffer) => ResponseType);
    cancel(): void;
    getPeer(): string;
    _read(_size: number): void;
}
export declare class ClientWritableStreamImpl<RequestType> extends Writable implements ClientWritableStream<RequestType> {
    private readonly call;
    readonly serialize: (value: RequestType) => Buffer;
    constructor(call: Call, serialize: (value: RequestType) => Buffer);
    cancel(): void;
    getPeer(): string;
    _write(chunk: RequestType, encoding: string, cb: Function): void;
    _final(cb: Function): void;
}
export declare class ClientDuplexStreamImpl<RequestType, ResponseType> extends Duplex implements ClientDuplexStream<RequestType, ResponseType> {
    private readonly call;
    readonly serialize: (value: RequestType) => Buffer;
    readonly deserialize: (chunk: Buffer) => ResponseType;
    constructor(call: Call, serialize: (value: RequestType) => Buffer, deserialize: (chunk: Buffer) => ResponseType);
    cancel(): void;
    getPeer(): string;
    _read(_size: number): void;
    _write(chunk: RequestType, encoding: string, cb: Function): void;
    _final(cb: Function): void;
}
