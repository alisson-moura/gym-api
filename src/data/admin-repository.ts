import { Admin } from "../models/Admin";

export interface AdminRepository {
    findByLogin: (login: string) => Promise<Admin | null>
}