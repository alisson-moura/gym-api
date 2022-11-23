import { describe, expect, test, vi } from 'vitest'
import { ShowAllAppointments } from '.'
import { InMemoryAppointmentRepository } from '../../../../data/in-memory-repositories/appoitment-repository'
import { Appointment } from '../../../../models/appointment'

describe('Use Case: Show All Appointments', () => {
    test('Deve retornar um array com todos os agendamentos', async () => {
        const fakeRepository = new InMemoryAppointmentRepository()
        vi.spyOn(fakeRepository, 'findAll').mockImplementationOnce(async () => [new Appointment()])

        const sut = new ShowAllAppointments(fakeRepository)
        const result = await sut.execute({date: new Date()})

        expect(result[0]).toBeInstanceOf(Appointment)
    })
})