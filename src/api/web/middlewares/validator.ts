import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Joi from 'joi'
import { messages } from 'joi-translation-pt-br';
import Schemas from '../validation'

export const validator = (schema: string): any => {
    if (!Schemas.hasOwnProperty(schema))
        throw new Error(`'${schema}' schema is not exists`);

    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            let validated: any
            if (req.method == 'GET') {
                validated = await Schemas[schema].validateAsync(req.query, { messages })
                req.query = validated
            }
            else {
                validated = await Schemas[schema].validateAsync(req.body, { messages })
                req.body = validated
            }
            next()
        } catch (error) {
            if (Joi.isError(error))
                return res.status(400).json({ message: error.message })
            next(createHttpError(500))
        }
    }
}