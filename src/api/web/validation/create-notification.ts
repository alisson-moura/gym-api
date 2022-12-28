import Joi from "joi";

export const CreateNotificationSchema = Joi.object({
    title: Joi.string().required().min(3),
    text: Joi.string().required(),
})