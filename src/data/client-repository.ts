import { Client } from "../models/client";
import { AcceptTermDTO } from "../modules/clients/dtos/accept-term-dto";
import { CreateAccountDTO } from "../modules/clients/dtos/create-client-dto";
import { UpdateAccountDTO } from "../modules/clients/dtos/update-account-dto";

export interface ClientRepository {
    all:() => Promise<Client[]>
    findByEmail: (email: string) => Promise<Client | undefined>
    findByBadge: (badge: number) => Promise<Client | undefined>
    findById: (data: { id: number, password: boolean }) => Promise<Client | undefined>
    create: (data: CreateAccountDTO) => Promise<void>
    update: (data: UpdateAccountDTO) => Promise<Client>
    acceptTerm: (data: AcceptTermDTO) => Promise<void>
}