import { Payment } from "../models/Payment"

export interface PaymentsRepository {
    monthlyPayment: () => Promise<number>
    findPayment: ({ month, clientId }: { month: Date, clientId: number }) => Promise<Payment | null>
    register: (payment: Payment) => Promise<Payment>
}