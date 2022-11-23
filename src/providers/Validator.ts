
interface Field {
    name: string
    value: string
}
export class Validator {
    static requiredFields(fields: string[], data: any): void | string {
        const result = fields.filter(field => !data[field])
        if (result.length > 0)
            return `Required field(s): ${result.join(' / ')}`
        return
    }
    static minLengthField(length: number, field: Field): void | string {
        if (field.value.length < length) {
            return `${field.name} field requires at least ${length} characters`
        }
    }
    static equalFields(fields: Field[]): void | string {
        const value = fields[0].value
        if (!fields.every(field => field.value == value))
            return `These fields have different values: ${fields.map(field => field.name).join(' / ')}`
        return
    }
}