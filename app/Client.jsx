"use client";

import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja"; // 追加
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { formatDate } from "/lib/formatDate";

export function Client() {
  const router = useRouter();

  const handleDateClick = (arg) => {
    const date = arg.date;
    const dateStr = formatDate(date);
    router.push(`/${dateStr}`);
  };

  return (
    <div className="h-screen pt-5">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]} // 追加
        locale="ja" // 追加
        dateClick={handleDateClick}
        height={"100%"}
      />
    </div>
  );
}
