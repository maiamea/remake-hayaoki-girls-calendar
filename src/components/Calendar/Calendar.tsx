import jaLocale from '@fullcalendar/core/locales/ja'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';

import Router from 'next/router'
import React, { useEffect, useState, useRef } from 'react'

export const MyCalendar = (props: any) => {
  const events = props.events
  const initialView = props.initialView

  function onClick(info: any) {
    Router.push({
      pathname: '/form',
      query: { start: info.event.start.toISOString() }, // ISO-8601形式の文字列 YYYY-MM-DDTHH:mm:ss+09:00
    })
  }




  const [viewType, setViewType] = useState<string>('dayGridMonth')
  const calendarRef = useRef(null)

  

  function onWindowResize() {
    console.log('WindowResize')
    console.log(`window.innerWidth: ${window.innerWidth}`)
    // Windowのサイズを調べる
    const isMobileDevice = window.innerWidth <= 800 || window.navigator.userAgent.includes('Mobi')
    // モバイルデバイスであれば日表示、そうでなければ月表示を設定
    setViewType(isMobileDevice ? 'listWeek' : 'dayGridMonth')
    // FullCalendarのオブジェクトのchangeViewを実行する
    if (calendarRef.current) {
      console.log(calendarRef.current)
      const calendarApi = calendarRef.current.getApi()
      calendarApi.changeView(isMobileDevice ? 'listWeek' : 'dayGridMonth')
    }
    
    
  }

  useEffect(() => {
    // onWindowResize()
    // window.addEventListener('resize', onWindowResize)
    // return () => {
    //   window.removeEventListener('resize', onWindowResize)
    // }
  }, [])

  const updateURL = (viewName: string) => {
    const newURL = new URL(window.location.href);
    newURL.searchParams.set('view', viewName);
    window.history.pushState({}, '', newURL.toString());
};

  const handleViewChange = (view, prevView) => {
    console.log({view, prevView})
    if (view && view.view) {
      updateURL(view.view.type);
      
    }
}

  return (
    <>
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView={initialView}
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
        // windowResize={onWindowResize}
        contentHeight="auto"
        showNonCurrentDates={false}
        buttonText={{ list: '日' }}
        dayCellContent={(e) => {
          e.dayNumberText = e.dayNumberText.replace('日', '');
          return { html: e.dayNumberText };
        }}
        ref={calendarRef}
        viewDidMount={handleViewChange}

      />
    </>
  )
}
