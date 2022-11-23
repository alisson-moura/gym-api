"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.DateSchema = joi_1.default.object({
    date: joi_1.default.date().required()
});
//# sourceMappingURL=date.js.map