export class AppError {
    message: string
    code: number
    constructor(message: string, code = 400) {
        this.message = message
        this.code = code
    }
}