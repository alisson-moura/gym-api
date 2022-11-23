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
var faker_1 = require("@faker-js/faker");
var vitest_1 = require("vitest");
var _1 = require(".");
var appoitment_repository_1 = require("../../../../data/in-memory-repositories/appoitment-repository");
var appointment_1 = require("../../../../models/appointment");
var client_1 = require("../../../../models/client");
var AppError_1 = require("../../../../providers/AppError");
var fake_date_provider_1 = require("../../../../providers/fakes/fake-date-provider");
var factoryFakeClient = function () {
    var item = new client_1.Client();
    item.birthDate = faker_1.faker.date.birthdate();
    item.email = faker_1.faker.internet.email();
    item.id = 1;
    item.name = faker_1.faker.name.fullName();
    item.gender = 'm';
    item.status = 'active';
    return item;
};
var factoryFakeAppointment = function (start, end) {
    var item = new appointment_1.Appointment();
    item.id = 1;
    item.client = factoryFakeClient();
    item.status = 'pendente';
    item.createdAt = new Date();
    item.date = faker_1.faker.date.between(new Date().setHours(start, 0, 0, 0), new Date().setHours(end, 0, 0));
    return item;
};
var sut;
var fakeDateProvider = new fake_date_provider_1.FakeDateProvider();
var fakeAppointmentRepository = new appoitment_repository_1.InMemoryAppointmentRepository();
var fakeRequest;
(0, vitest_1.describe)('Use Case: Cancel Appointment', function () {
    (0, vitest_1.beforeEach)(function () {
        sut = new _1.CancelAppointment(fakeAppointmentRepository, fakeDateProvider);
        fakeRequest = {
            appointmentId: 1,
            clientId: 1,
            comments: 'canceled'
        };
    });
    (0, vitest_1.test)('Deve retornar um erro caso não seja encontrado um agendamento com o id informado', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, undefined];
                    }); }); });
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result.message).toEqual('Invalid appointment id');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso o agendamento encontrado não tenha o status de pendente', function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = factoryFakeAppointment(7, 20);
                    app.status = 'concluido';
                    vitest_1.vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, app];
                    }); }); });
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result.message).toEqual('Invalid appointment id');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso a data do agendamento seja anterior a data atual', function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = factoryFakeAppointment(7, 20);
                    app.date = faker_1.faker.date.recent();
                    vitest_1.vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, app];
                    }); }); });
                    vitest_1.vi.spyOn(fakeDateProvider, 'isBefore').mockImplementationOnce(function () { return true; });
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result.message).toEqual('Past appointments cannot be canceled');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso o agendamento não seja do cliente informado', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, factoryFakeAppointment(7, 20)];
                    }); }); });
                    fakeRequest.clientId = 2;
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result.message).toEqual('This appointment does not belong to the informed customer');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar o agendamento cancelado', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(fakeAppointmentRepository, 'findById').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, factoryFakeAppointment(7, 20)];
                    }); }); });
                    vitest_1.vi.spyOn(fakeAppointmentRepository, 'cancel').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, factoryFakeAppointment(7, 20)];
                    }); }); });
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(appointment_1.Appointment);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.spec.js.map