"use strict";
/**
 * Caso de uso: Agendamentos disponivéis
 * Descrição: Deve listar os horarios disponiveis para agendamento na data informada
 * Requisitos:
 *  - Deve ser fornecido a data do dia atual ou dia futuro
 *  - Deve ser listado apenas os agendamentos que estão 1h a frente do horario atual
 *  - Deve ser permitido no maximo 20 agendamentos por hora
 *  - Deve listar os agendamentos em formato de array de horas - 07:00
 */
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
var schedule_1 = require("../../../../models/schedule");
var AppError_1 = require("../../../../providers/AppError");
var fake_date_provider_1 = require("../../../../providers/fakes/fake-date-provider");
var factoryFakesAppointments = function (amount) {
    var appointments = [];
    for (var i = 0; i <= amount; i++) {
        var item = new appointment_1.Appointment();
        item.id = i;
        item.status = 'pendente';
        item.createdAt = new Date();
        item.date = faker_1.faker.date.between(new Date().setHours(7, 0, 0, 0), new Date().setHours(20, 0, 0));
        appointments.push(item);
    }
    return appointments;
};
var sut;
var fakeRequest;
var fakeAppointmentRepository = new appoitment_repository_1.InMemoryAppointmentRepository(factoryFakesAppointments(300));
var fakeDateProvider = new fake_date_provider_1.FakeDateProvider();
(0, vitest_1.describe)('Use Case: Show Available Appointments', function () {
    (0, vitest_1.beforeEach)(function () {
        sut = new _1.ShowAvailableAppointments(fakeAppointmentRepository, fakeDateProvider);
        fakeRequest = { date: new Date() };
    });
    (0, vitest_1.test)('Deve  retornar um erro caso a data fornecida seja anterior ao dia atual', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    vitest_1.vi.spyOn(fakeDateProvider, 'isBefore').mockImplementationOnce(function () { return true; });
                    fakeRequest.date.setDate(fakeRequest.date.getDate() - 1);
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf(AppError_1.AppError);
                    (0, vitest_1.expect)(result.message).toEqual('Date provided is invalid');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve chamar o método findAll do repositório de Appointments com o valor correto', function () { return __awaiter(void 0, void 0, void 0, function () {
        var spy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spy = vitest_1.vi.spyOn(fakeAppointmentRepository, 'findAll');
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(spy).toBeCalledWith(fakeRequest.date);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve listar apenas os horarios com menos de 20 agendamentos', function () { return __awaiter(void 0, void 0, void 0, function () {
        var appointments, schedule, amountAppointments, unavailableHours, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fakeAppointmentRepository.findAll(fakeRequest.date)];
                case 1:
                    appointments = _a.sent();
                    schedule = new schedule_1.Schedule();
                    amountAppointments = schedule.hours.map(function (h) { return ({ hour: h, amount: 0 }); });
                    appointments.forEach(function (app) {
                        var hour = app.date.getHours();
                        var index = amountAppointments.findIndex(function (am) { return am.hour == hour; });
                        amountAppointments[index].amount += 1;
                    });
                    unavailableHours = amountAppointments.filter(function (am) { return am.amount > 20 || am.hour < new Date().getHours(); }).map(function (h) { return h.hour; });
                    return [4 /*yield*/, sut.execute(fakeRequest)];
                case 2:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).not.toEqual(unavailableHours);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)('Deve listar os agendamentos em formato de array de numeros', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sut.execute(fakeRequest)];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBeInstanceOf((Array));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.spec.js.map