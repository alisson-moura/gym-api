"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
exports.default = (0, config_1.defineConfig)({
    test: {
        exclude: ['build', 'node_modules'],
        coverage: {
            exclude: __spreadArray(__spreadArray([], config_1.defaultExclude, true), ['src/data/in-memory-repositories/*', 'src/providers/fakes/*'], false)
        }
        // ...
    },
});
//# sourceMappingURL=vite.config.js.map