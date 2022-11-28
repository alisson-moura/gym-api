import Joi from "joi";

export const CreateAdminSessionSchema = Joi.object({
    login:  Joi.string().required(),
    password: Joi.string().required().min(6)
})