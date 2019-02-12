"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const filter_1 = require("./filter");
class MetadataStatusFilter extends filter_1.BaseFilter {
    receiveTrailers(status) {
        return __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:prefer-const
            let { code, details, metadata } = yield status;
            if (code !== constants_1.Status.UNKNOWN) {
                // we already have a known status, so don't assign a new one.
                return { code, details, metadata };
            }
            const metadataMap = metadata.getMap();
            if (typeof metadataMap['grpc-status'] === 'string') {
                const receivedCode = Number(metadataMap['grpc-status']);
                if (receivedCode in constants_1.Status) {
                    code = receivedCode;
                }
                metadata.remove('grpc-status');
            }
            if (typeof metadataMap['grpc-message'] === 'string') {
                details = decodeURI(metadataMap['grpc-message']);
                metadata.remove('grpc-message');
            }
            return { code, details, metadata };
        });
    }
}
exports.MetadataStatusFilter = MetadataStatusFilter;
class MetadataStatusFilterFactory {
    constructor(channel) {
        this.channel = channel;
    }
    createFilter(callStream) {
        return new MetadataStatusFilter();
    }
}
exports.MetadataStatusFilterFactory = MetadataStatusFilterFactory;
//# sourceMappingURL=metadata-status-filter.js.map