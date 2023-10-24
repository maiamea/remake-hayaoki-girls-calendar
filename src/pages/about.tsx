import { Header } from '@/components/Header'

export default function AboutPage() {
  const hashtagLink =
    'https://twitter.com/search?q=%23hayaoki_girls&src=hashtag_click&f=live'

  return (
    <>
      <Header />
      <div className="flex justify-center w-full">
        <div className="max-w-2xl p-8 bg-gray-50">
          <h2 className="text-2xl	text-center">hayaoki_girlsとは</h2>
          <hr className="my-4 border-t border-orange-300 mx-auto" />
          <div className="text-gray-500 mb-10">
            <p>
              TECH PLAY女子部内での朝活を、hayaoki_girls と呼んでいます。
              2020年1月から有志でスタートし、2022年9月から実施場所が Zoom から
              Discord に移りました。 TECH PLAY女子部 Discord の hayaoki_girls
              ボイスチャンネルで実施します。
            </p>
          </div>

          <h2 className="text-2xl	text-center">朝活の流れ</h2>
          <hr className="my-4 border-t border-orange-300 mx-auto" />
          <table className="table-auto border-collapse border border-slate-400 text-center my-10 min-w-full">
            <thead>
              <tr>
                <th className="border border-slate-400 p-2">時間</th>
                <th className="border border-slate-400 p-2">内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-400 p-2">5:00 〜 5:10</td>
                <td className="border border-slate-400 p-2">Discord で雑談</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2">5:10 〜 6:00</td>
                <td className="border border-slate-400 p-2">
                  ミュートで各自好きなことをやる or 退室
                </td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2">6:00 〜 6:10</td>
                <td className="border border-slate-400 p-2">Discord で雑談</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2">6:10 〜 7:00</td>
                <td className="border border-slate-400 p-2">
                  ミュートで各自好きなことをやる or 退室
                </td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2">7:00 〜 7:10</td>
                <td className="border border-slate-400 p-2">Discord で雑談</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2">7:10 〜 8:00</td>
                <td className="border border-slate-400 p-2">
                  ミュートで各自好きなことをやる or 退室
                </td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2">8:00 〜 8:10</td>
                <td className="border border-slate-400 p-2">Discord で雑談</td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2">8:10 〜 9:00</td>
                <td className="border border-slate-400 p-2">
                  ミュートで各自好きなことをやる or 退室
                </td>
              </tr>
              <tr>
                <td className="border border-slate-400 p-2">9:00</td>
                <td className="border border-slate-400 p-2">解散</td>
              </tr>
            </tbody>
          </table>
          <div className="text-gray-500 mb-10">
            <p>
              雑談タイムの終わりはだいたい「今日もよろしくお願いします〜」の挨拶で終わります。
              ミュートで各自好きなことやる時間では、Discordから退室して作業される方もいます。
            </p>
          </div>

          <h2 className="text-2xl	text-center">特徴</h2>
          <hr className="my-4 border-t border-orange-300 mx-auto" />
          <div className="text-gray-500 mb-5">
            <ul className="list-disc my-10">
              <li className="font-bold">雑談だけ参加するのもOK</li>
              <li className="font-bold">
                参加できるときに参加すればOK（毎日参加しなくていい）
              </li>
              <li className="font-bold">
                好きな時間帯に参加すればOK（5時〜9時までずっといなくていい）
              </li>
              <li>途中参加・途中退出自由</li>
              <li>やることを宣言したり、やったことを報告する必要なし</li>
              <li>
                Discordに現れなくても、布団の中から
                <a
                  className="text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={hashtagLink}
                >
                  {' '}
                  #hayaoki_girls{' '}
                </a>
                のハッシュタグをつけて「おはよう」「起きた〜」と
                X（旧Twitter）にポストするだけでもOK
              </li>
            </ul>
          </div>

          <h2 className="text-2xl	text-center">
            hayaoki_girls カレンダーの役割
          </h2>
          <hr className="my-4 border-t border-orange-300 mx-auto" />
          <div className="text-gray-500 mb-10">
            <p>
              hayaoki_girls
              カレンダーを見ることで、参加予定人数（確定ではない）を事前に把握できます。
              なので、たとえ当日、自分以外の参加者がいなくても「カレンダーでこの時間帯の参加予定人数1人だったし仕方ない」と思えるし、
              初めて参加される方であれば、参加人数が多めの日を狙って参加日を決めやすくなります。
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
