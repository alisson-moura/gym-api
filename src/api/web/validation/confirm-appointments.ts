import Joi from "joi";

export const ConfirmAppointmentSchema = Joi.object({
    clientId: Joi.number().required(),
    appointmentId: Joi.number().required(),
    token: Joi.string().required()
})