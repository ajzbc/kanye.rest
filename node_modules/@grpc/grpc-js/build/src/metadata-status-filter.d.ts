import { Call } from './call-stream';
import { StatusObject } from './call-stream';
import { Channel } from './channel';
import { BaseFilter, Filter, FilterFactory } from './filter';
export declare class MetadataStatusFilter extends BaseFilter implements Filter {
    receiveTrailers(status: Promise<StatusObject>): Promise<StatusObject>;
}
export declare class MetadataStatusFilterFactory implements FilterFactory<MetadataStatusFilter> {
    private readonly channel;
    constructor(channel: Channel);
    createFilter(callStream: Call): MetadataStatusFilter;
}
