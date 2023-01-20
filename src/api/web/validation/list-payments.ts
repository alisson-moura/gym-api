import Joi from "joi";

export const ListPaymentstSchema = Joi.object({
    clientId: Joi.number(),
    page: Joi.number().default(1),
    badge: Joi.number(),
    month: Joi.date()
})