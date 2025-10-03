import { PrismaClient } from '@prisma/client'
import { addDays } from 'date-fns'

const prisma = new PrismaClient()

function mondayOf(date: Date) {
  const d = new Date(date)
  const day = d.getDay()
  const diff = (day === 0 ? -6 : 1) - day
  d.setDate(d.getDate() + diff)
  d.setHours(0,0,0,0)
  return d
}

async function main() {
  const users = await prisma.$transaction([
    prisma.user.upsert({ where: { email: 'analyst1@example.com' }, update: {}, create: { email:'analyst1@example.com', name:'Analyst One', grade:'Analyst', office:'Paris' } }),
    prisma.user.upsert({ where: { email: 'associate1@example.com' }, update: {}, create: { email:'associate1@example.com', name:'Associate One', grade:'Associate', office:'Paris' } }),
  ])

  const deal = await prisma.deal.upsert({
    where: { code: 'DEAL-001' },
    update: {},
    create: { code: 'DEAL-001', name: 'Sell-side ABC', client: 'ABC SA', sector: 'Industrials', priority: 1, status: 'Active' }
  })

  const today = new Date()
  const w0 = mondayOf(today)
  const w1 = addDays(w0, 7)
  const w2 = addDays(w0, 14)

  const analyst = users[0]

  await prisma.assignment.upsert({
    where: { dealId_userId_weekStart: { dealId: deal.id, userId: analyst.id, weekStart: w1 } },
    update: { plannedHours: 30 },
    create: { dealId: deal.id, userId: analyst.id, role: 'Analyst', weekStart: w1, plannedHours: 30, source: 'staffer', locked: false }
  })

  for (const ws of [w1, w2]) {
    await prisma.capacity.upsert({
      where: { userId_weekStart: { userId: analyst.id, weekStart: ws } },
      update: {},
      create: { userId: analyst.id, weekStart: ws, baseHours: 45, vacationHours: 0, trainingHours: 0, otherDeductionsHours: 0 }
    })
  }
}

main().catch(e => { console.error(e); process.exit(1) }).finally(async () => prisma.$disconnect())
