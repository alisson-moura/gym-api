import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import Joi from 'joi'
import Schemas from '../validation'

export const validator = (schema: string): any => {
    if (!Schemas.hasOwnProperty(schema))
        throw new Error(`'${schema}' schema is not exists`);

    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            let validated: any
            if (req.method == 'GET') {
                validated = await Schemas[schema].validateAsync(req.query)
                req.query = validated
            }
            else {
                validated = await Schemas[schema].validateAsync(req.body)
                req.body = validated
            }
            next()
        } catch (error) {
            if (Joi.isError(error))
                return res.status(400).json({ error })
            next(createHttpError(500))
        }
    }
}