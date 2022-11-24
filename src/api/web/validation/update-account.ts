import Joi from "joi";

export const UpdateAccountSchema = Joi.object({
    name: Joi.string().required().min(3),
    email:  Joi.string().email().required(),
    gender: Joi.string().max(1).required(),
    badge: Joi.number().allow(''),
    photo: Joi.string().allow(''),
    birthDate: Joi.date().allow(''),
    comments: Joi.string().allow('')
})