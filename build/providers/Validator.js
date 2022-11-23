"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.requiredFields = function (fields, data) {
        var result = fields.filter(function (field) { return !data[field]; });
        if (result.length > 0)
            return "Required field(s): ".concat(result.join(' / '));
        return;
    };
    Validator.minLengthField = function (length, field) {
        if (field.value.length < length) {
            return "".concat(field.name, " field requires at least ").concat(length, " characters");
        }
    };
    Validator.equalFields = function (fields) {
        var value = fields[0].value;
        if (!fields.every(function (field) { return field.value == value; }))
            return "These fields have different values: ".concat(fields.map(function (field) { return field.name; }).join(' / '));
        return;
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map