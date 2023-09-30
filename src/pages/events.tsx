// Prisma Clientをインポート
import { PrismaClient } from '@prisma/client';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { MyCalendar } from '@/components/Calendar/Calendar';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");


// Prismaのインスタンスを作成
const prisma = new PrismaClient();


// サーバー側だけで実行される
export const getServerSideProps = async ({ req }: any) => {
  console.log('getServerSideProps')
  // TODO: PrismaからEventsテーブルのデータ取得
  const events = await prisma.event.findMany({})
  const convertedEvents = []
  for (const event of events) {
    // 開始時刻、終了時刻をUTCからJSTに変換する
    const start = dayjs(event.startDateTime).tz().format()
    const end = dayjs(event.endDateTime).tz().format()
    const convertedEvent = {
      id: event.id,
      start: start,
      end: end,
      participantCount: event.participantCount,
      title: `${event.participantCount}人`
    }
    convertedEvents.push(convertedEvent)
  }

  return { props: { convertedEvents } }
}


// サーバーとクライアントの両方で動くコード
export default function EventsPage({ convertedEvents }: any) {
  console.log('Events Page', new Date().getTime())
  console.log(JSON.stringify({ convertedEvents }, null, 2))
  return (
    <>
    <MyCalendar events={convertedEvents} />
    </>
  )
}