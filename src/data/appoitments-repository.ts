import { Appointment } from "../models/appointment";
import { CreateAppointmentDTO } from "../modules/appointments/dtos/create-appointment-dto";

export interface AppoitmentRepository {
    findById: (id: number) => Promise<Appointment | undefined>
    create: (data: CreateAppointmentDTO) => Promise<Appointment>
    cancel: (data: { id: number, comments?: string }) => Promise<Appointment>
    confirm: (data: { id: number }) => Promise<Appointment>
    pending: (data: { id: number }) => Promise<Appointment>
    findByClientId: (id: number) => Promise<Appointment[]>
    findAll: (date: Date, status?: string, hour?: number) => Promise<Appointment[]>
    delete: (id: number) => Promise<void>
    report:(data: {startDate: Date, endDate: Date}) => Promise<Appointment[]>
}