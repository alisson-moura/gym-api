import Joi from "joi";

export const UpdateExerciseSchema = Joi.object({
    name: Joi.string().required(),
    id: Joi.string().alphanum(),
    url: Joi.string().required(),
    description: Joi.string().allow('')
})