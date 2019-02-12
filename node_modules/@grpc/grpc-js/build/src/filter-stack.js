"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FilterStack {
    constructor(filters) {
        this.filters = filters;
    }
    sendMetadata(metadata) {
        let result = metadata;
        for (let i = 0; i < this.filters.length; i++) {
            result = this.filters[i].sendMetadata(result);
        }
        return result;
    }
    receiveMetadata(metadata) {
        let result = metadata;
        for (let i = this.filters.length - 1; i >= 0; i--) {
            result = this.filters[i].receiveMetadata(result);
        }
        return result;
    }
    sendMessage(message) {
        let result = message;
        for (let i = 0; i < this.filters.length; i++) {
            result = this.filters[i].sendMessage(result);
        }
        return result;
    }
    receiveMessage(message) {
        let result = message;
        for (let i = this.filters.length - 1; i >= 0; i--) {
            result = this.filters[i].receiveMessage(result);
        }
        return result;
    }
    receiveTrailers(status) {
        let result = status;
        for (let i = this.filters.length - 1; i >= 0; i--) {
            result = this.filters[i].receiveTrailers(result);
        }
        return result;
    }
}
exports.FilterStack = FilterStack;
class FilterStackFactory {
    constructor(factories) {
        this.factories = factories;
    }
    createFilter(callStream) {
        return new FilterStack(this.factories.map((factory) => factory.createFilter(callStream)));
    }
}
exports.FilterStackFactory = FilterStackFactory;
//# sourceMappingURL=filter-stack.js.map