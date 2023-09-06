import Joi from "joi";

export const BlockDateSchema = Joi.object({
    date: Joi.date().required(),
    description: Joi.string().required(),
})