import { Call } from './call-stream';
import { Http2Channel } from './channel';
import { BaseFilter, Filter, FilterFactory } from './filter';
import { Metadata } from './metadata';
export declare class DeadlineFilter extends BaseFilter implements Filter {
    private readonly channel;
    private readonly callStream;
    private timer;
    private deadline;
    constructor(channel: Http2Channel, callStream: Call);
    sendMetadata(metadata: Promise<Metadata>): Promise<Metadata>;
}
export declare class DeadlineFilterFactory implements FilterFactory<DeadlineFilter> {
    private readonly channel;
    constructor(channel: Http2Channel);
    createFilter(callStream: Call): DeadlineFilter;
}
