// Prisma Clientをインポート
import { PrismaClient } from '@prisma/client'
import * as cookie from 'cookie'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { MyCalendar } from '@/components/Calendar/Calendar'
import { Hear } from '@/components/Header'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Tokyo')

// Prismaのインスタンスを作成
const prisma = new PrismaClient()

// サーバー側だけで実行される
// NOTE: ブラウザからクエリを受け取る (URL中の「?以降」)
export const getServerSideProps = async ({ query, req }: any) => {
  const cookies = req.headers.cookie
  const parsedCookies = cookie.parse(cookies)
  const eventIds = JSON.parse(parsedCookies.eventIds) || []
  const convertedEvents = []

  // PrismaからEventsテーブルのデータ取得
  const events = await prisma.event.findMany({})

  for (const event of events) {
    // 開始時刻、終了時刻をUTCからJSTに変換する (ISO-8601形式)
    const startObj = dayjs(event.startDateTime).tz()
    const start = startObj.format()
    const end = dayjs(event.endDateTime).tz().format()
    const isIncludeEventId = eventIds.includes(event.id)

    const convertedEvent = {
      id: event.id,
      start: start,
      end: end,
      participantCount: event.participantCount,
      title: isIncludeEventId
        ? `${event.participantCount}人 ★`
        : `${event.participantCount}人`,
    }
    convertedEvents.push(convertedEvent)
  }

  // 1ヶ月分のダミーデータ追加
  // 現在の日時を取得
  const today = dayjs(new Date())
  for (let additionalDay = 0; additionalDay <= 90; additionalDay++) {
    // 1日分のダミーデータ追加
    for (let hour = 5; hour <= 8; hour++) {
      const dateStr = today.add(additionalDay, 'd').format('YYYY-MM-DD')
      const dummyStart = `${dateStr}T0${hour}:00:00+09:00`
      const dummyEnd = `${dateStr}T0${hour}:00:10+09:00`
      // convertedEvents に追加しようとしているダミーデータと同じstartを持つeventがあれば,ダミーデータは追加しない
      if (convertedEvents.find((event) => event.start === dummyStart)) {
        continue
      }

      convertedEvents.push({
        id: 100 + hour + additionalDay * 10, // 重複防止
        start: dummyStart,
        end: dummyEnd,
        participantCount: 0,
        title: '-',
        textColor: 'white',
        backgroundColor: 'gray',
      })
    }
  }

  const initialView = query.view || 'listWeek'
  const initialDate = query.start || new Date().toISOString()
  return { props: { convertedEvents, initialView, initialDate } }
}

// サーバーとクライアントの両方で動くコード
export default function EventsPage({
  convertedEvents,
  initialView,
  initialDate,
}: any) {
  return (
    <>
      <Hear />
      <MyCalendar
        events={convertedEvents}
        initialView={initialView}
        initialDate={initialDate}
      />
    </>
  )
}
