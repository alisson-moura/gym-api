"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccountSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.UpdateAccountSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(3),
    email: joi_1.default.string().email().required(),
    gender: joi_1.default.string().max(1).required(),
    badge: joi_1.default.number(),
    photo: joi_1.default.string(),
    birthDate: joi_1.default.date(),
    comments: joi_1.default.string()
});
//# sourceMappingURL=update-account.js.map