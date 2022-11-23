/**
 * Caso de uso: Agendamentos disponivéis 
 * Descrição: Deve listar os horarios disponiveis para agendamento na data informada
 * Requisitos:
 *  - Deve ser fornecido a data do dia atual ou dia futuro
 *  - Deve ser listado apenas os agendamentos que estão 1h a frente do horario atual
 *  - Deve ser permitido no maximo 20 agendamentos por hora
 *  - Deve listar os agendamentos em formato de array de horas - 07:00
 */

import { faker } from "@faker-js/faker";
import { describe, expect, test, beforeEach, vi } from "vitest";
import { ShowAvailableAppointments } from ".";
import { InMemoryAppointmentRepository } from "../../../../data/in-memory-repositories/appoitment-repository";
import { Appointment } from "../../../../models/appointment";
import { Schedule } from "../../../../models/schedule";
import { AppError } from "../../../../providers/AppError";
import { FakeDateProvider } from "../../../../providers/fakes/fake-date-provider";

const factoryFakesAppointments = (amount: number): Appointment[] => {
    const appointments: Appointment[] = []
    for (let i = 0; i <= amount; i++) {
        const item = new Appointment()
        item.id = i
        item.status = 'pendente'
        item.createdAt = new Date()
        item.date = faker.date.between(new Date().setHours(7, 0, 0, 0), new Date().setHours(20, 0, 0))
        appointments.push(item)
    }
    return appointments
}

let sut: ShowAvailableAppointments
let fakeRequest: { date: Date }
const fakeAppointmentRepository = new InMemoryAppointmentRepository(factoryFakesAppointments(300))
const fakeDateProvider = new FakeDateProvider()

describe('Use Case: Show Available Appointments', () => {
    beforeEach(() => {
        sut = new ShowAvailableAppointments(fakeAppointmentRepository, fakeDateProvider)
        fakeRequest = { date: new Date() }
    })
    test('Deve  retornar um erro caso a data fornecida seja anterior ao dia atual', async () => {
        vi.spyOn(fakeDateProvider, 'isBefore').mockImplementationOnce(() => true)
        fakeRequest.date.setDate(fakeRequest.date.getDate() - 1)
        const result = await sut.execute(fakeRequest) as any

        expect(result).toBeInstanceOf(AppError)
        expect(result.message).toEqual('Date provided is invalid')
    })
    test('Deve chamar o método findAll do repositório de Appointments com o valor correto', async () => {
        const spy = vi.spyOn(fakeAppointmentRepository, 'findAll')
        await sut.execute(fakeRequest) as any
        expect(spy).toBeCalledWith(fakeRequest.date)
    })
    test('Deve listar apenas os horarios com menos de 20 agendamentos', async () => {
        const appointments = await fakeAppointmentRepository.findAll(fakeRequest.date)
        const schedule = new Schedule()
        const amountAppointments = schedule.hours.map(h => ({ hour: h, amount: 0 }))
        appointments.forEach(app => {
            const hour = app.date.getHours()
            const index = amountAppointments.findIndex(am => am.hour == hour)
            amountAppointments[index].amount += 1
        })
        const unavailableHours = amountAppointments.filter(am => am.amount > 20 || am.hour < new Date().getHours()).map(h => h.hour)
        const result = await sut.execute(fakeRequest) as any
        expect(result).not.toEqual(unavailableHours)
    })
    test('Deve listar os agendamentos em formato de array de numeros', async () => {
        const result = await sut.execute(fakeRequest) as any
        expect(result).toBeInstanceOf(Array<Number>)
    })
})