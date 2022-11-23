"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var _1 = require(".");
var client_repository_1 = require("../../../../data/in-memory-repositories/client-repository");
var client_1 = require("../../../../models/client");
var AppError_1 = require("../../../../providers/AppError");
var sut;
var fakeRequest;
var fakeClientRepository = new client_repository_1.InMemoryClientRepository();
(0, vitest_1.describe)('UseCase: Create Account', function () {
    (0, vitest_1.beforeEach)(function () {
        sut = new _1.CreateAccount(fakeClientRepository);
        fakeRequest = {
            name: 'Jonh Doe',
            email: 'jonh@mail.com',
            password: '123456',
            confirmPassword: '123456',
            gender: 'm'
        };
    });
    (0, vitest_1.test)('Deve retornar um erro caso o valor de um ou mais desses campos [name, email, password, confirmPassword, gender] sejam nulos', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeRequest.name = '';
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso os valores de [gender] sejam diferentes de "m" ou "f"', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeRequest.gender = 'a';
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result['message']).toEqual('Field gender accept values: m or f');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso o tamanho de [password] seja menor que 6', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeRequest.password = '12345';
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result['message']).toEqual('password field requires at least 6 characters');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso o [confirmPassword] possua um valor diferende de [password]', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeRequest.confirmPassword = '12345';
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result['message']).toEqual('These fields have different values: password / confirmPassword');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso o [email] já esteja em uso por outro cliente', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeClient, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeClient = new client_1.Client();
                    vitest_1.vi.spyOn(fakeClientRepository, 'findByEmail').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, fakeClient];
                    }); }); });
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result['message']).toEqual('Email in use by another user');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso o [badge] seja fornecido  e já esteja em uso por outro cliente', function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeClient, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeRequest.badge = 123;
                    fakeClient = new client_1.Client();
                    vitest_1.vi.spyOn(fakeClientRepository, 'findByBadge').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, fakeClient];
                    }); }); });
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result['message']).toEqual('Badge in use by another user');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve chamar o metódo create do repositório de clients com os valores corretos', function () { return __awaiter(void 0, void 0, void 0, function () {
        var spy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spy = vitest_1.vi.spyOn(fakeClientRepository, 'create');
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(spy).toHaveBeenCalledWith(fakeRequest);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.spec.js.map