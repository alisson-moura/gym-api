"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAppointmentSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.NewAppointmentSchema = joi_1.default.object({
    clientId: joi_1.default.number().required(),
    date: joi_1.default.date().required(),
    hour: joi_1.default.number().required()
});
//# sourceMappingURL=new-appointment.js.map