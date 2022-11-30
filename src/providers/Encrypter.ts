export interface Encrypter {
    encrypt: (value: string) => string
    compare: (plainText: string, hash: string) => boolean
}