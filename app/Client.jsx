"use client";

export const dynamic = "force-dynamic";

import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja"; // 追加
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { formatDate } from "/lib/formatDate";
import { statusColorConfig } from "./const";

export function Client({ schedules }) {
  const router = useRouter();

  const handleDateClick = (arg) => {
    const date = arg.date;
    const dateStr = formatDate(date);
    router.push(`/${dateStr}`);
  };

  const handleEventClick = (arg) => {
    const date = arg.event.start;
    const dateStr = formatDate(date);
    router.push(`/${dateStr}`);
  };

  const events = schedules.map((schedule) => {
    return {
      title: schedule.title,
      start: formatDate(schedule.date) + "T" + schedule.start_time,
      end: formatDate(schedule.date) + "T" + schedule.end_time,
      backgroundColor: statusColorConfig[schedule.status],
      borderColor: statusColorConfig[schedule.status],
    };
  });

  return (
    <div className="h-screen pt-5">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]} // 追加
        locale="ja" // 追加
        dateClick={handleDateClick}
        height={"100%"}
        events={events}
        eventClick={handleEventClick}
      />
    </div>
  );
}
