"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelAppointmentSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.CancelAppointmentSchema = joi_1.default.object({
    clientId: joi_1.default.number().required(),
    appointmentId: joi_1.default.number().required(),
    comments: joi_1.default.string()
});
//# sourceMappingURL=cancel-appointment.js.map