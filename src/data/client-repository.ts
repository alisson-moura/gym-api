import { Client } from "../models/client";
import { UpdatePasswordDTO } from "../modules/admin/reset-password/dto";
import { AcceptTermDTO } from "../modules/clients/dtos/accept-term-dto";
import { AddPhotoDTO } from "../modules/clients/dtos/add-photo-dto";
import { CreateAccountDTO } from "../modules/clients/dtos/create-client-dto";
import { UpdateAccountDTO } from "../modules/clients/dtos/update-account-dto";

export interface ClientRepository {
    all: (page: number) => Promise<Client[]>
    findAllByName: (page: number, name: string) => Promise<Client[]>
    findByEmail: (email: string) => Promise<Client | undefined>
    findByBadge: (badge: number) => Promise<Client | undefined>
    findById: (data: { id: number, password: boolean }) => Promise<Client | undefined>
    create: (data: CreateAccountDTO) => Promise<void>
    update: (data: UpdateAccountDTO) => Promise<Client>
    updatePassword: (data: UpdatePasswordDTO) => Promise<Client>
    acceptTerm: (data: AcceptTermDTO) => Promise<void>
    updatePhoto: (data: AddPhotoDTO) => Promise<void>
    unreadNotificationByAll: () => Promise<void>
    unreadNotificationById: (id: number) => Promise<void>
    readNotificationById: (id: number) => Promise<void>
}