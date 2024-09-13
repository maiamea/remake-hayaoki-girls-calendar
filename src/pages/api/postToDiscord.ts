import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import type { NextApiRequest, NextApiResponse } from 'next'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

// next.js起動時に環境変数を登録する

// DiscordのWebhook URLを環境変数から取得
const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL as string

// レスポンスデータの型
type ResponseData = {
  message: string
  success?: boolean
  error?: string
}

// Prismaのインスタンスを作成
const prisma = new PrismaClient()

// データベースに接続する関数
export const connect = async () => {
  try {
    //prismaでデータベースに接続
    prisma.$connect()
  } catch (error) {
    return Error('DB接続失敗しました')
  }
}

// 翌日のデータを取得する関数
async function getTomorrowData() {
  // 今日の日付を取得 UTCからJSTに変換する (ISO-8601形式: YYYY-MM-DDTHH:mm:ss.sss)
  const today = dayjs().tz().endOf('day').format() // 2024-09-11T23:59:59.999+09:00
  const tomorrow = dayjs(today).add(1, 'day').endOf('day').format() // 2024-09-12T23:59:59.999+09:00

  // 翌日のデータを取得
  const data = await prisma.event.findMany({
    where: {
      // startDateTimeが今日より大きくて、明日以下のデータを取得
      startDateTime: {
        gt: today,
        lte: tomorrow,
      },
    },
  })

  // データを返す
  return data
}

// 取得したデータを元にメッセージを作成する関数
async function makeMessage(data: any) {
  const lines = []
  for (const obj of data) {
    console.log({ obj })
    const startTime = dayjs(obj.startDateTime).tz().format('HH:mm')
    const endTime = dayjs(obj.endDateTime).tz().format('HH:mm')
    const participantCount = obj.participantCount
    lines.push(`【${startTime} ~ ${endTime}】 ${participantCount}人`)
  }
  const joinedLines = lines.join('\n')
  const message = `明日の参加予定人数です！\n${joinedLines}`
  return message
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  console.log('postToDiscord API called')

  // 翌日のデータを取得
  const data = await getTomorrowData()

  // データが存在しない場合の処理
  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'No data found for tomorrow' })
  }

  // 取得したデータを元にメッセージを作成
  const message = await makeMessage(data)

  // Discordの特定のチャンネルにメッセージを送信する処理
  // このAPI(/api/postToDiscord)を呼び出すことで、Discordの特定のチャンネルにメッセージを送信できるようにする
  // GETメソッドのみ許可
  if (req.method !== 'GET') {
    // 許可されていないメソッドの場合の処理
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  // Discordにメッセージを投稿
  try {
    await axios.post(discordWebhookUrl, {
      content: `${message}`,
    })
    res
      .status(200)
      .json({ success: true, message: 'Data posted to Discord successfully' })
  } catch (error) {
    console.error('Error posting message to Discord:', error)
    res.status(500).json({
      error: (error as Error).message,
      message: 'Failed to post message',
    })
  }
}
