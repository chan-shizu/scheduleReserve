"use client";

import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja"; // 追加
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

export function Client({ date }) {
  const router = useRouter();

  const handleDateClick = (arg) => {
    console.log(arg.date);
  };

  return (
    <div className="h-screen pt-5">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        locales={[jaLocale]} // 追加
        locale="ja" // 追加
        dateClick={handleDateClick}
        height={"100%"}
        initialDate={date}
      />
    </div>
  );
}
