import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: number
    iat: number
    exp: number
}

export default function auth(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers
    if (!authorization) {
        return res.sendStatus(401)
    }
    const token = authorization.replace('Bearer', '').trim()
    try {
        const data = jwt.verify(token, `${process.env.JWT_SECRET}`) as TokenPayload
        const { id } = data
        req.userId = id
        return next()
    } catch {
        return res.sendStatus(401)
    }
}

