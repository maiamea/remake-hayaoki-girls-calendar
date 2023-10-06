import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
// FullCalendarで月表示を可能にするプラグイン。
// FullCalendarで日付や時間が選択できるようになるプラグイン。
import timeGridPlugin from '@fullcalendar/timegrid'
//日本語対応

import Router from 'next/router'
import React from 'react'

export const MyCalendar = (props: any) => {
  const events = props.events

  function onClick(info: any) {
    Router.push({
      pathname: '/form',
      query: { start: info.event.start.toISOString() }, // ISO-8601形式の文字列 YYYY-MM-DDTHH:mm:ss+09:00
    })
  }

  return (
    <>
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
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
      />
    </>
  )
}
