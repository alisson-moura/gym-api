"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//import 'express-async-errors'
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var router_1 = __importDefault(require("./router"));
function startWebServer() {
    var app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    }));
    app.use(express_1.default.json());
    app.use(router_1.default);
    app.listen(process.env.PORT, function () { return console.log('\x1b[33m%s\x1b[0m', "Server :: Running @ 'http://localhost:".concat(process.env.PORT, "'")); });
    app.on('error', function (error) { return console.log('Error: ', error); });
}
exports.default = startWebServer;
//# sourceMappingURL=index.js.map