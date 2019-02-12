/// <reference types="node" />
import { Transform } from 'stream';
/**
 * Push an array of items into a Transform stream.
 * @param array The array you want to push to the stream.
 * @param stream The Transform stream into which array items are pushed.
 */
export declare function split(array: Array<{}>, stream: Transform): Promise<boolean>;
