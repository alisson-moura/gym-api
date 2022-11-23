import { Client } from "./client"

export class Appointment {
    id?: number
    date: Date
    client?: Client
    status: string
    hour: number
    comments?: string | null
    createdAt: Date 
    canceledAt?: Date | null
    confirmedIn?: Date | null
}