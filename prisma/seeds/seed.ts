import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const term = await prisma.term.create({
        data: {
            title: "Termo de Responsabilidade  para Prática de Atividade Física - Programa Movi Mente-se FUNFARME",
            text: "Assumo plena responsabilidade por qualquer atividade física praticada e isento a FUNFARME, bem como todos diretamente envolvidos no desenvolvimento das atividades oferecidas e praticadas pro mim, de toda e qualquer responsabilidade por danos a minha saúde ou de qualquer outra espécie, que enventualmente possam ser causados.\\nDeclaro ainda estar ciente que as aulas são oferecidas de forma gratuita e não integram a duração de minha jornada de trabalho, sendo minha livre e espontânea opção realizá-las."
        }
    })

    const guide = await prisma.guidelines.create({
        data: {
            title: "NORMAS DE FUNCIONAMENTO DA ACADEMIA",
            text: `A utilização dos equipamentos e materiais por parte do usuário deve ocorrer conforme a disponibilidade de uso durante as aulas e de acordo com a orientação dos instrutores;
            No caso da Academia de Ginástica, a utilização de esteiras, elípticos e bicicletas é limitada em 20 (vinte) minutos. Haverá a possibilidade de tempo adicional, sendo que esse procedimento deve estar em conformidade com a disponibilidade de uso e o programa de treinamento elaborado pelos instrutores;
            Na sala de musculação é obrigatório o revezamento dos equipamentos, não sendo permitido reservá-los colocando objetos pessoais para uso exclusivo;
            O usuário deve zelar pelos equipamentos e materiais da Academia da APCEF/PR, na sala de musculação ou de ginástica, bem como utilizá-los de forma adequada. Não é permitido jogar, arremessar, empurrar, soltar pesos com força e praticar atos que possam danificá-los ou oferecer risco aos demais usuários;
            O usuário deverá seguir as instruções dos professores na utilização dos aparelhos, zelando pela preservação dos mesmos;
            É de responsabilidade do usuário que utilizar o equipamento (anilhas, halteres, colchonetes, caneleiras, steps e barras) recolocá-los no local de origem após sua utilização, não o deixando espalhado, assim com higienizá-lo, caso necessário, com produtos de limpeza disponibilizados pela academia (pano e álcool), lembrando que outras pessoas farão uso dos mesmos.
            A autoridade máxima dentro da academia no que tange à execução dos exercícios, uso de equipamentos e/ou manutenção da disciplina, será do profissional responsável naquele período de funcionamento da academia;
            A academia não se responsabiliza pelo mau uso de máquinas e equipamentos submetidos a cargas elevadas, postura incorreta, tempo e intensidade extrapolados ao da série de exercícios prescritos, contrariando a orientação dos profissionais de educação física e a sua própria condição física;
            É vedada a utilização de quaisquer aparelhos sem a presença de um instrutor ou responsável.`
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