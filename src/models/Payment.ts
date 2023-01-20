import { Client } from "./client"

export class Payment {
    private id?: number
    private value: number
    private client: Client
    private createdAt?: Date
    private cardNumber: Number
    private month: Date

    constructor(props: {
        id?: number,
        value: number,
        client: Client,
        createdAt?: Date,
        cardNumber: Number,
        month: Date
    }) {
        this.cardNumber = props.cardNumber
        this.month = props.month
        this.value = props.value
        this.client = props.client

        if (props.id && props.createdAt) {
            this.id = props.id
            this.createdAt = props.createdAt
        }
    }

    public getCardNumber() { return this.cardNumber }
    public getValue() { return this.value }
    public getClient() { return this.client }
    public getMonth() { return this.month }
}