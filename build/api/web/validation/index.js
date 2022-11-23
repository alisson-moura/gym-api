"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cancel_appointment_1 = require("./cancel-appointment");
var confirm_appointments_1 = require("./confirm-appointments");
var create_account_1 = require("./create-account");
var create_session_1 = require("./create-session");
var date_1 = require("./date");
var new_appointment_1 = require("./new-appointment");
var update_account_1 = require("./update-account");
var Schemas = {
    CreateAccountSchema: create_account_1.CreateAccountSchema,
    CreateSessionSchema: create_session_1.CreateSessionSchema,
    UpdateAccountSchema: update_account_1.UpdateAccountSchema,
    DateSchema: date_1.DateSchema,
    NewAppointmentSchema: new_appointment_1.NewAppointmentSchema,
    CancelAppointmentSchema: cancel_appointment_1.CancelAppointmentSchema,
    ConfirmAppointmentSchema: confirm_appointments_1.ConfirmAppointmentSchema
};
exports.default = Schemas;
//# sourceMappingURL=index.js.map