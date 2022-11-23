import Joi from "joi";

export const CreateSessionSchema = Joi.object({
    email:  Joi.string().email().required(),
    password: Joi.string().required().min(6)
})