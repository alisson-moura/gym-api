import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.term.updateMany({
        data: {
            isActive: false
        }
    })
    const term = await prisma.term.create({
        data: {
            title: "Termo de Responsabilidade  para Prática de Atividade Física",
            text: "Estou ciente de que me foi recomendado conversar com um médico antes de iniciar exercícios de ativade física. Assumo plena responsabilidade por qualquer atividade física praticada sem o atendimento a essa recomendação e isento a FUNFARME, bem como todos diretamente envolvidos no desenvolvimento das atividades oferecidas e praticas por mim, de toda e qualquer responsabilidade por danos a minha saúde ou qualquer outra espécie, que eventualmente possam ser causados."
        }
    })

    await prisma.guidelines.updateMany({
        data: {
            isActive: false
        }
    })
    const guide = await prisma.guidelines.create({
        data: {
            title: "NORMAS DE FUNCIONAMENTO DA ACADEMIA",
            text: `Público alvo: colaboradores FUNFARME, profissionais e alunos Famerp; 
            Dias de funcionamento: Segunda-Feira à Sexta-Feira (exceto feriado); Horário de funcionamento: 10:00h as 19:00;
            Valor simbólico da mensalidade: R$ 40,00 (pagamento via pix);
            Agendamento: Deve ser realizado pelo aplicativo com antecedência e caso haja imprevisto, cancelar o agendamento com 30 minutos de antecedência;
            Faltas: Em situações de falta sem o cancelamento prévio no App, o agendamento é liberado novamente após 48 horas;
            Tempo de treino: máximo de 1h/dia;
            Capacidade máxima por horário: 20 alunos/hora;
            Vestimentas: Orienta-se roupas confortáveis de ginástica sem decotes excessivos;
            Proibido: sapato social, chinelos, sandálias, sapatilha, descalç, saia, vestido, short jeans ou calça jeans;
            Acompanhantes: Não é permitido a entrada de acompanhantes (familiares, amigos ou personal trainer);`
        }
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })