import { TokenProvider } from "../../providers/Token";
import jwt from 'jsonwebtoken'

export class JwtTokenProvider implements TokenProvider {
    create(id: number): string {
        const token = jwt.sign({ id: id }, `${process.env.JWT_SECRET}`, { expiresIn: `${process.env.JWT_EXPIRES}` })
        return token
    }
    getStaticToken(): string {
        const token = process.env.STATIC_TOKEN
            if(!token) throw new Error('Invalid Static Token')
        return token 
    }
}