import { Client } from "../../models/client";
import { CreateAccountDTO } from "../../modules/clients/dtos/create-client-dto";
import { UpdateAccountDTO } from "../../modules/clients/dtos/update-account-dto";
import { ClientRepository } from "../client-repository";

export class InMemoryClientRepository implements ClientRepository {
    update: (data: UpdateAccountDTO) => Promise<Client>;
    findById: (data: { id: number; password: boolean; }) => Promise<Client | undefined>;
    create: (data: CreateAccountDTO) => Promise<void>;
    async findByEmail(email: string): Promise<Client | undefined> {
        return undefined
    }
    async findByBadge(badge: number): Promise<Client | undefined> {
        return undefined
    }
}