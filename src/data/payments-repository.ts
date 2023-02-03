import { Payment } from "../models/Payment"

export interface PaymentsRepository {
    monthlyPayment: () => Promise<number>
    findPayment: ({ month, clientId }: { month: Date, clientId: number }) => Promise<Payment | null>
    register: (payment: Payment) => Promise<Payment>
    findByClient: ({ clientId, page }: { clientId: number, page: number }) => Promise<{ payments: Payment[], total: number }>
    findByBadge: ({ badge, page }: { badge: number, page: number }) => Promise<{ payments: Payment[], total: number }>
    findByMonth: ({ month, page }: { month: Date, page: number }) => Promise<{ payments: Payment[], total: number }>
    searchForPeriod: ({ startDate, endDate }: { startDate: Date, endDate: Date }) => Promise<Payment[]>
}