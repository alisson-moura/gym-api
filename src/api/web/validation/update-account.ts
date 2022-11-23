import Joi from "joi";

export const UpdateAccountSchema = Joi.object({
    name: Joi.string().required().min(3),
    email:  Joi.string().email().required(),
    gender: Joi.string().max(1).required(),
    badge: Joi.number(),
    photo: Joi.string(),
    birthDate: Joi.date(),
    comments: Joi.string()
})