import { PrismaClient } from '@prisma/client';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import 'dayjs/locale/ja'
import { PrimaryButton } from '@/components/Button/PrimaryButton';

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

  // データがなければダミーデータを返す
  if (!event) {
    const dummyEndStr = dayjs(query.start).add(10, 'm').format()
    const dummyProps: FormPageProps = {
      id: -1,
      start: query.start,
      end: dummyEndStr,
      participantCount: 0,
      title: '' // フォーム画面に表示しないので空文字にしとく
    }
    return { props: dummyProps }
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
  const startStr = dayjs(convertedEvent.start).format('M月D日(ddd) HH:mm')
  const endTimeStr = dayjs(convertedEvent.end).format('HH:mm')

  return (
    <div className="prose max-w-none w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="">
              <form method="post" action="/api/count-up">
                <div>
                  <h1 className="text-xl font-normal  text-center text-gray-600">参加申し込み</h1>
                </div>
                <div className="py-3 px-4">
                  <p className="mt-1 font-bold text-xl text-center">{startStr}〜{endTimeStr}</p>
                </div>
                <input type="hidden" name="date" value={convertedEvent.start} />
                <input type="hidden" name="participant" value={convertedEvent.participantCount} />
                <div className="text-center">
                  <PrimaryButton type="submit">参加する</PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}