import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';

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
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
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
        buttonText={{list: '日'}}
        dayCellContent={(e) => {
          e.dayNumberText = e.dayNumberText.replace('日', '');
          return { html: e.dayNumberText };
        }}
        
      />
    </>
  )
}
