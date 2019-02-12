import { Segment } from './path_template';
export declare const BINDING = 1;
export declare const END_BINDING = 2;
export declare const TERMINAL = 3;
/**
 * Completes the parsing of the segments
 *
 * Validates them, and transforms them into the object used by the
 * PathTemplate class.
 *
 * @private
 *
 * @param {Segments[]} segments the parsed segments
 * @param {Object} initializes the attributes of a PathTemplate
 * @return {Object} Returns segments and size
 * @throws {TypeError} if multiple path wildcards exist
 */
export declare function finishParse(segments: Segment[]): {
    segments: Segment[];
    size: number;
};
