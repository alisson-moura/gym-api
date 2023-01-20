import Joi from "joi";

export const RegisterPaymentSchema = Joi.object({
    clientId: Joi.number().required(),
    month: Joi.number().required().min(0).max(11),
    year: Joi.number().required().min(2022),
    cardNumber: Joi.number().required(),
    value: Joi.number()
})