export const HowToUse = () => {
  return (
    <>
      <div id="accordion-open" data-accordion="close" className="my-3 mx-3">
        <h2 id="accordion-open-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 rounded-t-xl dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            data-accordion-target="#accordion-open-body-1"
            aria-expanded="false"
            aria-controls="accordion-open-body-1"
          >
            <span className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                ></path>
              </svg>{' '}
              使い方ガイド
            </span>
            <svg
              data-accordion-icon
              className="w-3 h-3 rotate-180 shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-open-body-1"
          className="hidden"
          aria-labelledby="accordion-open-heading-1"
        >
          <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900">
            <div className="prose mb-2 text-gray-500 dark:text-gray-400">
              <ol>
                <li>参加したい日時をクリックする</li>
                <li>参加申し込み画面が表示される</li>
                <li>「参加する」をクリックする</li>
                <li>選択した日時に「★」が表示される</li>
              </ol>
            </div>
            <p className="mt-5">--- 注意事項 ---</p>
            <div className="prose">
              <ul>
                <li>現時点で参加登録できるのは3ヶ月先までです</li>
                <li>
                  おおよその参加予定人数が分かるようにするのが目的なので、「参加」をクリックしたからといって必ず参加しないといけないわけじゃないので安心してください
                </li>
                <li>
                  現時点で「参加」を取り消す機能はないです。間違ってクリックしてしまっても気にしないでください
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
