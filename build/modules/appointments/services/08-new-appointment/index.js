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
exports.NewAppointment = void 0;
var schedule_1 = require("../../../../models/schedule");
var AppError_1 = require("../../../../providers/AppError");
var NewAppointment = /** @class */ (function () {
    function NewAppointment(appointmentRepository, clientRepository, dateProvider) {
        this.appointmentRepository = appointmentRepository;
        this.clientRepository = clientRepository;
        this.dateProvider = dateProvider;
    }
    NewAppointment.prototype.execute = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var date, clientId, hour, day, schedule, appoitments, appLimit, availableHours, client, clientAppointments, pendingClientAppointments, futureAppointment, newAppointment;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = request.date, clientId = request.clientId, hour = request.hour;
                        day = new Date();
                        day.setHours(0, 0, 0, 0);
                        if (this.dateProvider.isBefore(date, day)) {
                            return [2 /*return*/, new AppError_1.AppError('Only future dates are accepted')];
                        }
                        schedule = new schedule_1.Schedule();
                        return [4 /*yield*/, this.appointmentRepository.findAll(date)];
                    case 1:
                        appoitments = _a.sent();
                        appoitments = appoitments.filter(function (appoitment) { return appoitment.status != 'cancelado'; });
                        appLimit = schedule.hours.map(function (h) { return ({ hour: h, amount: 0 }); });
                        appoitments.forEach(function (app) {
                            var hour = app.date.getHours();
                            var index = appLimit.findIndex(function (al) { return al.hour == hour; });
                            appLimit[index].amount += 1;
                        });
                        availableHours = appLimit
                            .filter(function (al) { return al.amount < schedule.limit && al.hour > new Date().getHours(); })
                            .map(function (al) { return al.hour; });
                        if (!availableHours.includes(hour)) {
                            return [2 /*return*/, new AppError_1.AppError('Hour not available for appointment')];
                        }
                        return [4 /*yield*/, this.clientRepository.findById({ id: clientId, password: false })];
                    case 2:
                        client = _a.sent();
                        if (client === undefined) {
                            return [2 /*return*/, new AppError_1.AppError('Invalid client id')];
                        }
                        return [4 /*yield*/, this.appointmentRepository.findByClientId(clientId)];
                    case 3:
                        clientAppointments = _a.sent();
                        pendingClientAppointments = clientAppointments.filter(function (item) { return item.status == 'pendente'; });
                        futureAppointment = pendingClientAppointments.some(function (item) { return _this.dateProvider.isAfter(item.date, date); });
                        if (futureAppointment) {
                            return [2 /*return*/, new AppError_1.AppError('An appointment already exists for this client')];
                        }
                        if (pendingClientAppointments.some(function (item) { return _this.dateProvider.differenceInHours(date, item.date) <= 48; }))
                            return [2 /*return*/, new AppError_1.AppError('Client is not able to make new appointments')];
                        date.setHours(hour, 0, 0);
                        return [4 /*yield*/, this.appointmentRepository.create({
                                clientId: clientId,
                                date: date,
                                hour: hour
                            })];
                    case 4:
                        newAppointment = _a.sent();
                        return [2 /*return*/, newAppointment];
                }
            });
        });
    };
    return NewAppointment;
}());
exports.NewAppointment = NewAppointment;
//# sourceMappingURL=index.js.map