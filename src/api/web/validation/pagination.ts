import Joi from "joi";

export const PaginationSchema = Joi.object({
    page: Joi.number().required().default(1).min(1),
    limit: Joi.number().allow(''),
    search: Joi.string().allow('')
})