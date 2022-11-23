export interface UpdateAccountDTO {
    id: number
    name: string;
    email: string;
    gender: string
    badge?: number
    photo?: string
    birthDate?:string
    comments?: string
}