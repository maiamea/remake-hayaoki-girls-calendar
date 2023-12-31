import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'

import Router from 'next/router'
import React, { useState } from 'react'

export const MyCalendar = (props: any) => {
  const events = props.events
  const initialView = props.initialView
  const initialDate = props.initialDate
  const [isDayGridMonthView, setIsDayGridMonthView] = useState<boolean>(true)

  function onClick(info: any) {
    Router.push({
      pathname: '/form',
      query: {
        start: info.event.start.toISOString(), // ISO-8601形式の文字列 YYYY-MM-DDTHH:mm:ss+09:00
        initialView: info.view.type,
      },
    })
  }

  // URLのクエリパラメータを更新する
  const updateURL = (viewName: string) => {
    // 現在開いているブラウザのフルURLを取得 (文字列)し、URL Obj に変換する
    const newURL = new URL(window.location.href)
    // クエリパラメータの設定: viewキーを追加
    newURL.searchParams.set('view', viewName)
    // ブラウザ履歴の更新: ブラウザのアドレスバーのURLを更新
    window.history.pushState({}, '', newURL.toString())
  }

  // FullCalendarのビューが変更されたときに現在のビューのタイプに基づいてURLのクエリパラメータを更新する
  const handleViewChange = (info: any) => {
    updateURL(info.view.type)
    setIsDayGridMonthView(info.view.type === 'dayGridMonth')
  }

  return (
    <div className="px-3">
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView={initialView}
        initialDate={initialDate}
        headerToolbar={{
          start: 'today prev,next',
          center: isDayGridMonthView ? 'title' : '',
          right: 'dayGridMonth,timeGridWeek,listWeek',
        }}
        slotMinTime={'04:00:00'}
        slotMaxTime={'10:00:00'}
        expandRows={true}
        eventMinHeight={50}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
        }}
        locale={jaLocale}
        events={events}
        eventClick={onClick}
        contentHeight="auto"
        showNonCurrentDates={false}
        buttonText={{ list: 'リスト' }}
        dayCellContent={(e) => {
          e.dayNumberText = e.dayNumberText.replace('日', '')
          return { html: e.dayNumberText }
        }}
        viewDidMount={handleViewChange}
      />
    </div>
  )
}
