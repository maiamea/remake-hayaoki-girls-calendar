import { PrismaClient } from '@prisma/client';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import 'dayjs/locale/ja'

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
dayjs.locale('ja')


// Prismaのインスタンスを作成
const prisma = new PrismaClient();

type FormPageProps = {
  id: number
  start: string
  end: string
  participantCount: number
  title: string
}

export const getServerSideProps = async ({ req, query }: any) => {
  const event = await prisma.event.findFirst({
    where: { startDateTime: query.start } // ISO-8601形式の文字列 YYYY-MM-DDTHH:mm:ss+09:00
  })

  // データがなければ404を返す
  if (!event) {
    return { notFound: true };
  }

  // 開始時刻、終了時刻をUTCからJSTに変換する
  const start = dayjs(event.startDateTime).tz().format()
  const end = dayjs(event.endDateTime).tz().format()
  const convertedEvent: FormPageProps = {
    id: event.id,
    start: start,
    end: end,
    participantCount: event.participantCount,
    title: `${event.participantCount}人`
  }

  return { props: convertedEvent }
}


export default function Form(convertedEvent: FormPageProps) {
  const startStr = dayjs(convertedEvent.start).format('YYYY年M月D日(ddd) HH:mm')
  const endTimeStr = dayjs(convertedEvent.end).format('HH:mm')

  return (
    <form method="post" action="/api/count-up">
      <h1>参加フォーム</h1>
      <p>【日時】{startStr}〜{endTimeStr}</p>
      <input type="hidden" name="date" value={convertedEvent.start} />
      <input type="hidden" name="participant" value={convertedEvent.participantCount} />
      <input type="submit" value="参加" />
    </form>
  )
}