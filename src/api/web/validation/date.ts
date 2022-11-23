import Joi from "joi";

export const DateSchema  = Joi.object({
    date: Joi.date().required()
})