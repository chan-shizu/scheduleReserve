import { Client } from "./Client";
import { sql } from "@vercel/postgres";
import { fetchSchedulesByDate } from "/lib/fetchScheduleByDate";

export default async function Page({ params: { date } }) {
  const schedules = await fetchSchedulesByDate(date);

  return (
    <div className="bg-white">
      <Client date={date} initialSchedules={schedules.rows} />
    </div>
  );
}
