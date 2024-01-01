"use client";

import { useRouter } from "next/navigation";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import interactionPlugin from "@fullcalendar/interaction";

import { useForm, handleSubmit } from "react-hook-form";
import { Suspense, useState } from "react";
import { Button } from "/components/Button";
import { ScheduleDetailRow } from "/components/ScheduleDetailRow";
import { formatDate } from "/lib/formatDate";
import { statusColorConfig, statusConfig } from "../const";
import { ErrorMessage } from "/components/ErrorMessage";
import { postSchedule } from "/lib/postSchedule";
import { fetchSchedulesByDate } from "/lib/fetchScheduleByDate";
import Loading from "/app/loading";

export function Client({ date, initialSchedules }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(-1);
  const [selectedEventId, setSelectedEventId] = useState(-1);
  const [schedules, setSchedules] = useState(initialSchedules);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const handleEventClick = (arg) => {
    const id = arg.event.id;
    setSelectedEventId(id);
    setShowModal(2);
  };

  const closeModal = () => {
    setShowModal(0);
  };

  const onSubmit = async (data) => {
    setShowModal(-1);
    const scheduleBody = { ...data, date: date };
    const error = await postSchedule(scheduleBody);
    if (error) return;
    const updatedSchedules = await fetchSchedulesByDate(date);
    if (updatedSchedules.error) return;
    setSchedules(await updatedSchedules.rows);
    reset();
  };

  const handleOnBackButton = () => {
    router.push("/");
    router.refresh();
  };

  const events = Array.isArray(schedules)
    ? schedules.map((schedule) => {
        return {
          id: schedule.schedule_id,
          title: schedule.title,
          start: formatDate(schedule.date) + "T" + schedule.start_time,
          end: formatDate(schedule.date) + "T" + schedule.end_time,
          backgroundColor: statusColorConfig[schedule.status],
          borderColor: statusColorConfig[schedule.status],
        };
      })
    : [];

  const selectedEvent =
    Array.isArray(schedules) &&
    schedules.find((schedule) => schedule.schedule_id == selectedEventId);

  let selectedEventOptionText = "";
  if (selectedEvent) {
    if (selectedEvent.option_high_tension)
      selectedEventOptionText += "ハイテンション、";
    if (selectedEvent.option_room) selectedEventOptionText += "部屋使用、";
    if (selectedEvent.option_fashionable)
      selectedEventOptionText += "とびきりのオシャレ、";
    if (selectedEvent.option_car) selectedEventOptionText += "車運転、";
    if (selectedEvent.option_guitar) selectedEventOptionText += "ギター演奏、";
    if (selectedEvent.option_kindness)
      selectedEventOptionText += "とびきりの優しさ、";
    if (selectedEventOptionText.slice(-1) == "、")
      selectedEventOptionText = selectedEventOptionText.slice(0, -1);
  }

  return (
    <div className="h-full">
      <div className="flex justify-center relative">
        <h1 className="text-center text-4xl py-4">{date}</h1>
        <div className="pl-3 absolute top-2 right-5 text-sm">
          <p className="text-[#87ceeb]">確認中</p>
          <p className="text-[#00ff7f]">承認</p>
          <p className="text-[#ffa500]">却下</p>
        </div>
      </div>
      <div className="h-[calc(100vh-168px)]">
        <Suspense fallback={<Loading />}>
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
            allDaySlot={false}
          />
        </Suspense>
      </div>
      <div className="sticky bottom-0 bg-white py-4 flex justify-center z-10 px-5 gap-x-4">
        <Button onClick={handleOnBackButton} text="一覧画面に戻る" type="sub" />
        <Button onClick={() => setShowModal(1)} text=" スケジュール追加" />
      </div>

      {showModal == 1 && (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white fixed h-full w-full top-0 left-0 z-20 overflow-y-scroll"
          >
            <h1 className="text-3xl mx-auto py-4 text-center">
              スケジュール登録
              <span className=" text-xl">({date})</span>
            </h1>
            <div className="px-4 py-3">
              <div>
                <label className="text-xl" htmlFor="title">
                  タイトル
                </label>
                <input
                  id="title"
                  className="border-2 rounded-lg w-full mt-2 h-10"
                  {...register("title", {
                    required: "タイトルは必須です",
                  })}
                />
                {errors.title && <ErrorMessage text={errors.title.message} />}
              </div>
            </div>
            <div className="px-4 py-3">
              <label className="text-xl" htmlFor="name">
                登録者名(僕に伝わる名前で！匿名なら後でDMかなんかで連絡ください！)
              </label>
              <input
                id="name"
                className="border-2 rounded-lg w-full mt-2 h-10"
                {...register("name", {
                  required: "登録者名は必須です",
                })}
              />
              {errors.name && <ErrorMessage text={errors.name.message} />}
            </div>
            <div className="px-4 py-3">
              <label className="text-xl" htmlFor="startTime">
                開始時間
              </label>
              <input
                id="startTime"
                className="border-2 rounded-lg w-full mt-2 h-10"
                type="time"
                {...register("startTime", {
                  required: "開始時間は必須です",
                })}
              />
              {errors.startTime && (
                <ErrorMessage text={errors.startTime.message} />
              )}
            </div>
            <div className="px-4 py-3">
              <label className="text-xl" htmlFor="endTime">
                終了時間
              </label>
              <input
                id="endTime"
                className="border-2 rounded-lg w-full mt-2 h-10"
                type="time"
                {...register("endTime", {
                  required: "終了時間は必須です",
                  validate: {
                    message: (value) =>
                      value > getValues("startTime")
                        ? null
                        : "終了時刻は開始時刻の後にしてください",
                  },
                })}
              />
              {errors.endTime && <ErrorMessage text={errors.endTime.message} />}
            </div>
            <div className="px-4 py-3 w-full">
              <p className="text-xl">オプション</p>
              <div className="flex flex-wrap mt-3 w-full gap-y-4">
                <div className="flex align-middle justify-between w-1/2 gap-x-1 pr-4">
                  <label className="my-auto" htmlFor="optionHighTension">
                    ハイテンション
                  </label>
                  <input
                    className="h-5 w-5 my-auto"
                    id="optionHighTension"
                    type="checkbox"
                    {...register("optionHighTension", {})}
                  />
                </div>
                <div className="flex align-middle justify-between w-1/2 gap-x-1 pr-4">
                  <label className="my-auto" htmlFor="optionRoom">
                    部屋使用
                  </label>
                  <input
                    className="h-5 w-5 my-auto"
                    id="option_room"
                    type="checkbox"
                    {...register("optionRoom", {})}
                  />
                </div>
                <div className="flex align-middle justify-between w-1/2 gap-x-1 pr-4">
                  <label className="my-auto" htmlFor="optionFashionable">
                    とびきりのオシャレ
                  </label>
                  <input
                    className="h-5 w-5 my-auto"
                    id="optionFashionable"
                    type="checkbox"
                    {...register("optionFashionable", {})}
                  />
                </div>
                <div className="flex align-middle justify-between w-1/2 gap-x-1 pr-4">
                  <label className="my-auto" htmlFor="optionCar">
                    車運転
                  </label>
                  <input
                    className="h-5 w-5 my-auto"
                    id="optionCar"
                    type="checkbox"
                    {...register("optionCar", {})}
                  />
                </div>
                <div className="flex align-middle justify-between w-1/2 gap-x-1 pr-4">
                  <label className="my-auto" htmlFor="optionGuitar">
                    ギター演奏
                  </label>
                  <input
                    className="h-5 w-5 my-auto"
                    id="optionGuitar"
                    type="checkbox"
                    {...register("optionGuitar", {})}
                  />
                </div>
                <div className="flex align-middle justify-between w-1/2 gap-x-1 pr-4">
                  <label className="my-auto" htmlFor="optionKindness">
                    とびきりの優しさ
                  </label>
                  <input
                    className="h-5 w-5 my-auto"
                    id="optionKindness"
                    type="checkbox"
                    {...register("optionKindness", {})}
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3">
              <label className="text-xl">詳細</label>
              <input
                className="border-2 rounded-lg w-full mt-2 h-10"
                type="text"
                {...register("description", {
                  required: "何か一言！",
                })}
              />
              {errors.description && (
                <ErrorMessage text={errors.description.message} />
              )}
            </div>
            <div className="py-4 flex justify-center px-5 gap-x-4">
              <Button onClick={closeModal} type="sub" />
              <input
                className="bg-red-400 py-5 w-full rounded-full"
                type="submit"
              />
            </div>
          </form>
        </>
      )}

      {showModal == 2 && (
        <div className="bg-white fixed h-full w-full top-0 left-0 z-20 px-5 pt-8 pb-5 overflow-y-scroll">
          <h2 className="text-5xl text-center">{selectedEvent.title}</h2>
          <div className="flex flex-col mt-6 divide-y-2 border-y-2">
            <ScheduleDetailRow name="登録者" text={selectedEvent.name} />
            <ScheduleDetailRow
              name="開始時間"
              text={selectedEvent.start_time}
            />
            <ScheduleDetailRow name="終了時間" text={selectedEvent.end_time} />
            <ScheduleDetailRow
              name="オプション"
              text={
                selectedEventOptionText == ""
                  ? "オプションなし"
                  : selectedEventOptionText
              }
            />
            <ScheduleDetailRow name="詳細" text={selectedEvent.description} />
            <ScheduleDetailRow
              name="ステータス"
              text={statusConfig[selectedEvent.status]}
            />
            <ScheduleDetailRow
              name="コメント"
              text={
                selectedEvent.comment
                  ? selectedEvent.comment
                  : "まだコメントがないです。ちょっと待ってて"
              }
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
