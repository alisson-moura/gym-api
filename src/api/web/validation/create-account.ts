import Joi from "joi";

export const CreateAccountSchema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    confirmPassword: Joi.ref('password'),
    gender: Joi.string().max(1).required(),
    company: Joi.string().required(),
    badge: Joi.number().allow('')
})