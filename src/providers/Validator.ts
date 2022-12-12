
interface Field {
    name: string
    value: string
}
export class Validator {
    static requiredFields(fields: string[], data: any): void | string {
        const result = fields.filter(field => !data[field])
        if (result.length > 0)
            return `Campos obrigatórios: ${result.join(' / ')}.`
        return
    }
    static minLengthField(length: number, field: Field): void | string {
        if (field.value.length < length) {
            return `O campo ${field.name} deve ter no mínimo ${length} caracteres.`
        }
    }
    static equalFields(fields: Field[]): void | string {
        const value = fields[0].value
        if (!fields.every(field => field.value == value))
            return `O valor desses campos devem ser iguais: ${fields.map(field => field.name).join(' / ')}.`
        return
    }
}