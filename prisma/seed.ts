import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

console.log('Prisma seed');

const events = [
  // [id, startDateTime, EndDateTime, ParticipantCount]
  {id: 1, startDateTime: "2023-09-01T05:00:00+09:00", endDateTime: "2023-09-01T05:10:00+09:00", participantCount: 3},
  {id: 2, startDateTime: "2023-09-01T06:00:00+09:00", endDateTime: "2023-09-01T06:10:00+09:00", participantCount: 1},
  {id: 3, startDateTime: "2023-09-01T07:00:00+09:00", endDateTime: "2023-09-01T07:10:00+09:00", participantCount: 2},
  {id: 4, startDateTime: "2023-09-01T08:00:00+09:00", endDateTime: "2023-09-01T08:10:00+09:00", participantCount: 0},
  {id: 5, startDateTime: "2023-09-02T05:00:00+09:00", endDateTime: "2023-09-03T05:10:00+09:00", participantCount: 3},
  {id: 6, startDateTime: "2023-09-02T06:00:00+09:00", endDateTime: "2023-09-03T06:10:00+09:00", participantCount: 3},
  {id: 7, startDateTime: "2023-09-02T07:00:00+09:00", endDateTime: "2023-09-03T07:10:00+09:00", participantCount: 3},
  {id: 8, startDateTime: "2023-09-02T08:00:00+09:00", endDateTime: "2023-09-03T08:10:00+09:00", participantCount: 3},
]

async function main() {
  for (const event of events) {
    const result = await prisma.event.upsert({
      where: {id: event.id},
      update: {},
      create: {
        startDateTime: event.startDateTime,
        endDateTime: event.endDateTime,
        participantCount: event.participantCount
      },
    })
    console.log(result)
  }
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