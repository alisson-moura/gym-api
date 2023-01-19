export class Group {
    private id: number
    private name: string
    private description: string | null
    private isPaying: boolean

    constructor(props: { id: number, name: string, description: string | null, isPaying: boolean }) {
        this.id = props.id
        this.name = props.name
        this.description = props.description
        this.isPaying = props.isPaying
    }

    public getId(): number {
        return this.id
    }

    public setId(id: number) {
        this.id = id
    }

    public getName(): string {
        return this.name
    }

    public setName(name: string) {
        this.name = name
    }

    public getDescription(): string | null {
        return this.description
    }

    public setDescription(description: string | null) {
        this.description = description
    }

    public get paying(): boolean {
        return this.isPaying
    }

    public set paying(isPaying: boolean) {
        this.isPaying = isPaying
    }
}