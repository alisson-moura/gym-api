import { prisma } from '.';
import { Client, Groups, Payments } from '@prisma/client';
import { PaymentsRepository } from '../../data/payments-repository';
import { Payment } from '../../models/Payment';
import { PrismaClientRepository } from './client-repository';

export class PrismaPaymentRepository implements PaymentsRepository {
    private mapper(data: Payments & {
        client: Client & {
            group: Groups | null;
        };
    }): Payment {
        const payment = new Payment({
            id: data.id,
            cardNumber: parseInt(data.cardNumber),
            month: data.month,
            value: data.value,
            createdAt: data.createdAt,
            client: PrismaClientRepository.mapper({ data: data.client })
        })

        return payment
    }

    async monthlyPayment(): Promise<number> {
        const DEFAULT_VALUE_OF_MONTHLY_PAYMENT = 40
        const result = await prisma.monthlyPayment.findFirst()
        return result?.value || DEFAULT_VALUE_OF_MONTHLY_PAYMENT
    }

    async findPayment({ month, clientId }: { month: Date; clientId: number; }): Promise<Payment | null> {
        const result = await prisma.payments.findFirst({
            where: {
                clientId,
                month
            },
            include: {
                client: {
                    include: { group: true }
                }
            }
        })
        if (result != null) {
            return this.mapper(result)
        }
        return result
    }

    async register(payment: Payment): Promise<Payment> {
        const result = await prisma.payments.create({
            data: {
                cardNumber: payment.getCardNumber().toString(),
                month: payment.getMonth(),
                value: payment.getValue(),
                clientId: payment.getClient().id!,
            },
            include: {
                client: {
                    include: { group: true }
                }
            }
        })
        return this.mapper(result)
    }
}