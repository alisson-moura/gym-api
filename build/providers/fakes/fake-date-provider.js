"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeDateProvider = void 0;
var FakeDateProvider = /** @class */ (function () {
    function FakeDateProvider() {
    }
    FakeDateProvider.prototype.isBefore = function (date, dateToCompare) {
        return false;
    };
    return FakeDateProvider;
}());
exports.FakeDateProvider = FakeDateProvider;
//# sourceMappingURL=fake-date-provider.js.map