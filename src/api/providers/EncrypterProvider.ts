import bcrypt from "bcrypt";
import { Encrypter } from "../../providers/Encrypter";

export class EncrypterProvider implements Encrypter {
    private saltRounds = 10
    encrypt(value: string): string {
        const hash = bcrypt.hashSync(value, this.saltRounds);
        return hash
    }
    compare(plainText: string, hash: string): boolean {
        const match = bcrypt.compareSync(plainText, hash)
        return match
    }
}