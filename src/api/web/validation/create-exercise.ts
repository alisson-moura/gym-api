import Joi from "joi";

export const CreateExerciseSchema = Joi.object({
    name: Joi.string().required(),
    url: Joi.string().required(),
    groupId: Joi.string().alphanum().required(),
    description: Joi.string().allow('')
})