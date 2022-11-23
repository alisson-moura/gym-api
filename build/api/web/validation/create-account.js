"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.CreateAccountSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(3),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(6),
    confirmPassword: joi_1.default.ref('password'),
    gender: joi_1.default.string().max(1).required(),
    badge: joi_1.default.number()
});
//# sourceMappingURL=create-account.js.map