import Joi from "joi";

export const CancelAppointmentSchema = Joi.object({
    clientId: Joi.number().required(),
    appointmentId: Joi.number().required(),
    comments: Joi.string()
})