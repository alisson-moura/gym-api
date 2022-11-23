export interface TokenProvider {
    create(id: number): string
    getStaticToken(): string
}