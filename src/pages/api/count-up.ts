// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: string
}

// Prismaのインスタンスを作成
const prisma = new PrismaClient()

// DBを更新する
async function updateData(data: any, numOfParticipant: number) {
  const event = await prisma.event.findFirst({
    where: { startDateTime: data.date },
  })

  if (event) {
    await prisma.event.update({
      where: { id: event.id },
      data: { participantCount: numOfParticipant },
    })
  } else {
    await prisma.event.create({
      data: {
        startDateTime: data.date,
        endDateTime: dayjs(data.date).add(10, 'm').format(),
        participantCount: 1,
      },
    })
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = req.body
  // 参加人数をカウントアップする
  const countedUpParticipant = parseInt(data.participant, 10) + 1
  // DB更新
  await updateData(data, countedUpParticipant)
  res.redirect(307, '/')
}
