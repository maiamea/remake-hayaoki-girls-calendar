// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'
import * as cookie from 'cookie'
import dayjs from 'dayjs'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: string
}

// Cookie有効期限： 90日間
const maxAge = 7776000

// Prismaのインスタンスを作成
const prisma = new PrismaClient()

// DBを更新する
async function updateData(data: any, numOfParticipant: number) {
  const event = await prisma.event.findFirst({
    where: { startDateTime: data.date },
  })

  if (event) {
    const updatedEvent = await prisma.event.update({
      where: { id: event.id },
      data: { participantCount: numOfParticipant },
    })
    return updatedEvent.id
  } else {
    const createdEvent = await prisma.event.create({
      data: {
        startDateTime: data.date,
        endDateTime: dayjs(data.date).add(10, 'm').format(),
        participantCount: 1,
      },
    })
    return createdEvent.id
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = req.body
  const initialView = data.initialView
  const initialDate = data.date

  // 参加人数をカウントアップする
  const countedUpParticipant = parseInt(data.participant, 10) + 1
  // DB更新
  const eventId = await updateData(data, countedUpParticipant)

  // URLエンコード
  // NOTE: URLとして特別な意味を持つ記号(「+」や「:」など)を別の文字列に置き換える
  const queryParamObj = new URLSearchParams({
    start: initialDate,
    view: initialView,
  })
  const queryParamStr = queryParamObj.toString()

  // Cookieを解析してeventIdsを取り出す
  const cookies = req.headers.cookie || ''
  const parsedCookies = cookie.parse(cookies)
  const eventIds = JSON.parse(parsedCookies.eventIds || '[]') || []
  eventIds.push(eventId)
  const stringifiedEventIds = JSON.stringify(eventIds)

  // eventのidをCookieにセットする
  // NOTE: 全てのページでCookieを使用できるようにした
  res.setHeader(
    'Set-Cookie',
    `eventIds=${stringifiedEventIds}; Max-Age=${maxAge}; Path=/`,
  )
  res.redirect(307, `/?${queryParamStr}`)
}
