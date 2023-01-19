import Joi from "joi";

export const UpdateClientSchema = Joi.object({
    id: Joi.number().required(),
    group: Joi.string().required().min(2),
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    gender: Joi.string().max(1).required(),
    badge: Joi.number().allow(''),
    birthDate: Joi.date().allow(''),
    height: Joi.number().default(0),
    weight: Joi.number().default(0),
    company: Joi.string().allow('')
})