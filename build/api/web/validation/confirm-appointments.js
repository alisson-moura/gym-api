"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmAppointmentSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.ConfirmAppointmentSchema = joi_1.default.object({
    clientId: joi_1.default.number().required(),
    appointmentId: joi_1.default.number().required(),
    token: joi_1.default.string().required()
});
//# sourceMappingURL=confirm-appointments.js.map