"use client";

import { useRouter } from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja"; // 追加
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { useState } from "react";
import { Button } from "/components/Button";
import { ScheduleDetailRow } from "/components/scheduleDetailRow";

export function Client({ date }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(0);

  const handleEventClick = (arg) => {
    setShowModal(2);
    console.log(arg);
  };

  const closeModal = () => {
    setShowModal(0);
  };

  const events = [
    {
      title: "The Title",
      start: date,
      end: date,
      startTime: "12:30",
      endTime: "15:10",
    },
    {
      title: "The Title",
      start: date,
      end: date,
      startTime: "16:30",
      endTime: "19:50",
    },
  ];

  return (
    <div className="h-screen pt-5">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        locales={[jaLocale]} // 追加
        locale="ja" // 追加
        height={"100%"}
        initialDate={date}
        events={events}
        eventClick={handleEventClick}
      />
      <div className="sticky bottom-0 bg-white py-4 flex justify-center z-10 px-5">
        <button
          className=" bg-red-400 py-5 w-full rounded-full"
          onClick={() => setShowModal(1)}
        >
          スケジュール追加
        </button>
      </div>
      {showModal == 1 && (
        <div className="bg-white fixed h-full w-full top-0 left-0 z-20">
          <div className="py-4 flex justify-center px-5">
            <Button onClick={closeModal} />
          </div>
        </div>
      )}
      {showModal == 2 && (
        <div className="bg-white fixed h-full w-full top-0 left-0 z-20 px-5 pt-8 pb-5">
          <h2 className="text-5xl text-center">タイトル</h2>
          <div className="flex flex-col gap-y-6 mt-6">
            <ScheduleDetailRow name="登録者" text="テストテストテスト" />
            <ScheduleDetailRow name="開始時間" text="テストテストテスト" />
            <ScheduleDetailRow name="終了時間" text="テストテストテスト" />
            <ScheduleDetailRow name="終了時間" text="テストテストテスト" />
            <ScheduleDetailRow name="詳細" text="テストテストテスト" />
          </div>
          <div className="bg-white py-4 flex justify-center mt-4">
            <Button onClick={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
