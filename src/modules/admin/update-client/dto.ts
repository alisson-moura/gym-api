export interface UpdateClientDTO {
    id: number
    name: string
    email: string
    gender: string
    group: string
    badge?: number
    photo?: string
    birthDate?:string
    comments?: string
    height?: number
    weight?: number
    company?: string
}