import { Client } from "../../models/client";
import { UpdatePasswordDTO } from "../../modules/admin/reset-password/dto";
import { AcceptTermDTO } from "../../modules/clients/dtos/accept-term-dto";
import { AddPhotoDTO } from "../../modules/clients/dtos/add-photo-dto";
import { CreateAccountDTO } from "../../modules/clients/dtos/create-client-dto";
import { UpdateAccountDTO } from "../../modules/clients/dtos/update-account-dto";
import { ClientRepository } from "../client-repository";

export class InMemoryClientRepository implements ClientRepository {
    unreadNotificationByAll: () => Promise<void>;
    unreadNotificationById: (id: number) => Promise<void>;
    readNotificationById: (id: number) => Promise<void>;
    updatePassword: (data: UpdatePasswordDTO) => Promise<Client>;
    findAllByName: (page: number, name: string) => Promise<Client[]>;
    updatePhoto: (data: AddPhotoDTO) => Promise<void>;
    all: () => Promise<Client[]>;
    acceptTerm: (data: AcceptTermDTO) => Promise<void>;
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