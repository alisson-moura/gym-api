"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenProvider = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JwtTokenProvider = /** @class */ (function () {
    function JwtTokenProvider() {
    }
    JwtTokenProvider.prototype.create = function (id) {
        var token = jsonwebtoken_1.default.sign({ id: id }, "".concat(process.env.JWT_SECRET), { expiresIn: "".concat(process.env.JWT_EXPIRES) });
        return token;
    };
    JwtTokenProvider.prototype.getStaticToken = function () {
        var token = process.env.STATIC_TOKEN;
        if (!token)
            throw new Error('Invalid Static Token');
        return token;
    };
    return JwtTokenProvider;
}());
exports.JwtTokenProvider = JwtTokenProvider;
//# sourceMappingURL=JwtTokenProvider.js.map