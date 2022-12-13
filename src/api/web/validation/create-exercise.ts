import Joi from "joi";

export const CreateExerciseSchema = Joi.object({
    name: Joi.string().required(),
    url: Joi.string().required(),
    groupId: Joi.number().required(),
    description: Joi.string().allow('')
})