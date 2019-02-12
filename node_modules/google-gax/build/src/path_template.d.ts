export interface ParseResult {
    size: number;
    segments: Segment[];
}
export interface Segment {
    kind: number;
    literal: string;
}
export declare type Bindings = {
    [index: string]: string;
};
export declare class PathTemplate {
    private readonly parseResult;
    readonly size: number;
    readonly segments: Segment[];
    /**
     * @param {String} data the of the template
     *
     * @constructor
     */
    constructor(data: string);
    /**
     * Matches a fully-qualified path template string.
     *
     * @param {String} path a fully-qualified path template string
     * @return {Object} contains const names matched to binding values
     * @throws {TypeError} if path can't be matched to this template
     */
    match(path: string): Bindings;
    /**
     * Renders a path template using the provided bindings.
     *
     * @param {Object} bindings a mapping of const names to binding strings
     * @return {String} a rendered representation of the path template
     * @throws {TypeError} if a key is missing, or if a sub-template cannot be
     *   parsed
     */
    render(bindings: Bindings): string;
    /**
     * Renders the path template.
     *
     * @return {string} contains const names matched to binding values
     */
    inspect(): string;
}
