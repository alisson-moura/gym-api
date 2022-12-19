import { Appointment } from "../../models/appointment";
import { CreateAppointmentDTO } from "../../modules/appointments/dtos/create-appointment-dto";
import { AppoitmentRepository } from "../appoitments-repository";


export class InMemoryAppointmentRepository implements AppoitmentRepository {
    private appointments: Appointment[] = []

    constructor(appoitments: Appointment[] = []) {
        this.appointments = appoitments
    }
    pending: (data: { id: number; }) => Promise<Appointment>;
    delete: (id: number) => Promise<void>;
    confirm: (data: { id: number; }) => Promise<Appointment>;
    
    cancel: (data: { id: number; comments?: string | undefined; }) => Promise<Appointment>;
    findById: (id: number) => Promise<Appointment | undefined>;
    create: (data: CreateAppointmentDTO) => Promise<Appointment>;

    async findByClientId(id: number): Promise<Appointment[]> {
        return this.appointments
    }
    async findAll(date: Date): Promise<Appointment[]> {
        const day = date.getDate()
        return this.appointments.filter(app => app.date.getDate() === day)
    }
}