"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFnsProvider = void 0;
var date_fns_1 = require("date-fns");
var DateFnsProvider = /** @class */ (function () {
    function DateFnsProvider() {
    }
    DateFnsProvider.prototype.isBefore = function (date, dateToCompare) {
        return (0, date_fns_1.isBefore)(date, dateToCompare);
    };
    DateFnsProvider.prototype.isAfter = function (date, dateToCompare) {
        return (0, date_fns_1.isAfter)(date, dateToCompare);
    };
    DateFnsProvider.prototype.differenceInHours = function (date, dateToCompare) {
        return (0, date_fns_1.differenceInHours)(date, dateToCompare);
    };
    return DateFnsProvider;
}());
exports.DateFnsProvider = DateFnsProvider;
//# sourceMappingURL=DateFnsProvider.js.map