"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
let _logger = console;
let _logVerbosity = constants_1.LogVerbosity.DEBUG;
exports.getLogger = () => {
    return _logger;
};
exports.setLogger = (logger) => {
    _logger = logger;
};
exports.setLoggerVerbosity = (verbosity) => {
    _logVerbosity = verbosity;
};
// tslint:disable-next-line no-any
exports.log = (severity, ...args) => {
    if (severity >= _logVerbosity && typeof _logger.error === 'function') {
        _logger.error(...args);
    }
};
//# sourceMappingURL=logging.js.map