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
var client_repository_1 = require("../../../../data/in-memory-repositories/client-repository");
var appointment_1 = require("../../../../models/appointment");
var client_1 = require("../../../../models/client");
var AppError_1 = require("../../../../providers/AppError");
var fake_date_provider_1 = require("../../../../providers/fakes/fake-date-provider");
var factoryFakesAppointments = function (amount, start, end) {
    var appointments = [];
    for (var i = 0; i <= amount; i++) {
        var item = new appointment_1.Appointment();
        item.id = i;
        item.status = 'pendente';
        item.createdAt = new Date();
        item.date = faker_1.faker.date.between(new Date().setHours(start, 0, 0, 0), new Date().setHours(end, 0, 0));
        appointments.push(item);
    }
    return appointments;
};
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
var sut;
var fakeAppointmentRepository = new appoitment_repository_1.InMemoryAppointmentRepository();
var fakeClientRepository = new client_repository_1.InMemoryClientRepository();
var fakeDateProvider = new fake_date_provider_1.FakeDateProvider();
var fakeRequest;
(0, vitest_1.describe)('Use Case: New Appointment', function () {
    (0, vitest_1.beforeEach)(function () {
        sut = new _1.NewAppointment(fakeAppointmentRepository, fakeClientRepository, fakeDateProvider);
        fakeRequest = {
            clientId: 1,
            date: new Date(),
            hour: new Date().getHours() + 1
        };
    });
    (0, vitest_1.test)('Deve retornar um erro caso a data fornecida seja anterior a atual', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(fakeDateProvider, 'isBefore').mockImplementationOnce(function () { return true; });
                    fakeRequest.date = faker_1.faker.date.recent();
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result.message).toEqual('Only future dates are accepted');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso o horario informado seja anterior ao horario atual', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fakeRequest.hour = new Date().getHours() - 1;
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result.message).toEqual('Hour not available for appointment');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso o horario informado já possua mais de 20 agendamentos', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(fakeAppointmentRepository, 'findAll').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, factoryFakesAppointments(20, new Date().getHours() + 1, new Date().getHours() + 2)];
                    }); }); });
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result.message).toEqual('Hour not available for appointment');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso o id do client informado seja inválido', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(fakeClientRepository, 'findById').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, undefined];
                    }); }); });
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result.message).toEqual('Invalid client id');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso o client tenha um agendamento pendente posterior a data atual', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(fakeClientRepository, 'findById').mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, factoryFakeClient()];
                    }); }); });
                    vitest_1.vi.spyOn(fakeAppointmentRepository, 'findByClientId').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, factoryFakesAppointments(1, new Date().getHours() + 1, new Date().getHours() + 2)];
                    }); }); });
                    vitest_1.vi.spyOn(fakeDateProvider, 'isAfter').mockImplementationOnce(function () { return true; });
                    fakeRequest.date = new Date();
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result.message).toEqual('An appointment already exists for this client');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um erro caso o client possua um agendamento "pendente" com menos de 48h a partir da data do agendamento', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(fakeClientRepository, 'findById').mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, factoryFakeClient()];
                    }); }); });
                    vitest_1.vi.spyOn(fakeAppointmentRepository, 'findByClientId').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var appointments, item;
                        return __generator(this, function (_a) {
                            appointments = [];
                            item = new appointment_1.Appointment();
                            item.id = 1;
                            item.status = 'pendente';
                            item.createdAt = new Date();
                            item.date = faker_1.faker.date.recent(1, new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getHours()));
                            appointments.push(item);
                            return [2 /*return*/, appointments];
                        });
                    }); });
                    vitest_1.vi.spyOn(fakeDateProvider, 'differenceInHours').mockImplementationOnce(function () { return 24; });
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result.message).toEqual('Client is not able to make new appointments');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve retornar um novo agendamento', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(fakeClientRepository, 'findById').mockImplementation(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, factoryFakeClient()];
                    }); }); });
                    vitest_1.vi.spyOn(fakeAppointmentRepository, 'findByClientId').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, []];
                    }); }); });
                    vitest_1.vi.spyOn(fakeAppointmentRepository, 'create').mockImplementationOnce(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, new appointment_1.Appointment()];
                    }); }); });
                    vitest_1.vi.spyOn(fakeDateProvider, 'differenceInHours').mockImplementationOnce(function () { return 49; });
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