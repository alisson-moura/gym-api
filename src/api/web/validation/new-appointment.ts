import Joi from "joi";

export const NewAppointmentSchema = Joi.object({
    clientId: Joi.number().required(),
    date: Joi.date().required(),
    hour: Joi.number().required()
})