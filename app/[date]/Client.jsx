"use client";

import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja"; // 追加
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useState } from "react";
import { Button } from "/components/Button";
import { ScheduleDetailRow } from "/components/ScheduleDetailRow";
import { formatDate } from "/lib/formatDate";
import { statusColorConfig, statusConfig } from "../const";

export function Client({ date, schedules }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState(-1);

  const handleEventClick = (arg) => {
    const id = arg.event.id;
    setSelectedEventId(id);
    setShowModal(2);
  };

  const closeModal = () => {
    setShowModal(0);
  };

  const events = schedules.map((schedule) => {
    return {
      id: schedule.schedule_id,
      title: schedule.title,
      start: formatDate(schedule.date) + "T" + schedule.start_time,
      end: formatDate(schedule.date) + "T" + schedule.end_time,
      backgroundColor: statusColorConfig[schedule.status],
      borderColor: statusColorConfig[schedule.status],
    };
  });

  console.log(events);

  const selectedEvent = schedules.find(
    (schedule) => schedule.schedule_id == selectedEventId
  );

  return (
    <div className="h-screen">
      <div className="flex justify-center">
        <h1 className="text-center text-4xl py-4">{date}</h1>
      </div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        locales={[jaLocale]} // 追加
        locale="ja" // 追加
        height={"100%"}
        initialDate={date}
        events={events}
        eventClick={handleEventClick}
        headerToolbar={false}
      />
      <div className="sticky bottom-0 bg-white py-4 flex justify-center z-10 px-5 gap-x-4">
        <Button
          onClick={() => router.push("/")}
          text="一覧画面に戻る"
          type="sub"
        />
        <Button onClick={() => setShowModal(1)} text=" スケジュール追加" />
      </div>
      {showModal == 1 && (
        <div className="bg-white fixed h-full w-full top-0 left-0 z-20">
          <div className="py-4 flex justify-center px-5">
            <Button onClick={closeModal} />
          </div>
        </div>
      )}
      {showModal == 2 && (
        <div className="bg-white fixed h-full w-full top-0 left-0 z-20 px-5 pt-8 pb-5 ">
          <h2 className="text-5xl text-center">{selectedEvent.title}</h2>
          <div className="flex flex-col mt-6 divide-y-2 border-y-2">
            <ScheduleDetailRow name="登録者" text={selectedEvent.name} />
            <ScheduleDetailRow
              name="開始時間"
              text={selectedEvent.start_time}
            />
            <ScheduleDetailRow name="終了時間" text={selectedEvent.end_time} />
            <ScheduleDetailRow name="詳細" text={selectedEvent.description} />
            <ScheduleDetailRow
              name="返事"
              text={statusConfig[selectedEvent.status]}
            />
          </div>
          <div className="bg-white py-4 flex justify-center mt-4">
            <Button onClick={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
