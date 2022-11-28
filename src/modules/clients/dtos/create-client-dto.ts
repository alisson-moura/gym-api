export interface CreateAccountDTO {
    name: string;
    email: string;
    password: string;
    confirmPassword: string
    badge?: number
    gender: string
    company: string
}