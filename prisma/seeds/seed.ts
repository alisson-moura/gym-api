import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const term = await prisma.term.create({
        data: {
            title: "Termo de Responsabilidade  para Prática de Atividade Física - Programa Movi Mente-se FUNFARME",
            text: "Assumo plena responsabilidade por qualquer atividade física praticada e isento a FUNFARME, bem como todos diretamente envolvidos no desenvolvimento das atividades oferecidas e praticadas pro mim, de toda e qualquer responsabilidade por danos a minha saúde ou de qualquer outra espécie, que enventualmente possam ser causados.\n<p>Declaro ainda estar ciente que as aulas são oferecidas de forma gratuita e não integram a duração de minha jornada de trabalho, sendo minha livre e espontânea opção realizá-las."
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