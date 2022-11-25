import { Term } from "../models/term";

export interface TermRepository {
    findById: (id: number) => Promise<Term | undefined>  
}