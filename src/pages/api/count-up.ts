// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'


type Data = {
  data: string
}

// Prismaのインスタンスを作成
const prisma = new PrismaClient();

// DBを更新する
async function updateData(data: any, numOfParticipant: number) {
  const event = await prisma.event.findFirst({
    where: { startDateTime: data.date },
  })

  if (!event) {
    throw new Error('Function Error: updateData')
  }

  await prisma.event.update({
    where: { id: event.id },
    data: { participantCount: numOfParticipant },
  })
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = req.body
  // 参加人数をカウントアップする
  const countedUpParticipant = parseInt(data.participant, 10) + 1
  // DB更新
  await updateData(data, countedUpParticipant)
  res.redirect(307, '/events')
}
