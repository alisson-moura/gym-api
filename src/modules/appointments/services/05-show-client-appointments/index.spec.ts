import { describe, expect, test, vi } from 'vitest'
import { ShowClientAppointments } from '.'
import { InMemoryAppointmentRepository } from '../../../../data/in-memory-repositories/appoitment-repository'
import { Appointment } from '../../../../models/appointment'

describe('Use Case: Show Client Appointments', () => {
    test('Deve retornar um array de appoitments do client informado', async () => {
        const fakeRepository = new InMemoryAppointmentRepository()
        vi.spyOn(fakeRepository, 'findByClientId').mockImplementationOnce(async() => [new Appointment()])

        const sut = new ShowClientAppointments(fakeRepository)
        const result = await sut.execute({id: 1})
        
        expect(result[0]).toBeInstanceOf(Appointment)
    })
})