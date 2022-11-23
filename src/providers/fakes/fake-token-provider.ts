import { TokenProvider } from "../Token";

export class FakeTokenProvider implements TokenProvider {
    getStaticToken(): string {
        return 'fake_token'
    }
    create(id: number): string {
        return 'fake_token'
    }

}
