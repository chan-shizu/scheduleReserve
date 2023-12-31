import { Client } from "./Client";
import { sql } from "@vercel/postgres";

const fetchSchedules = async (date) => {
  try {
    const schedules = await sql`SELECT * FROM schedule WHERE date = ${date};`;
    return schedules;
  } catch (error) {
    console.log(error);
    return { error: "error発生" };
  }
};

export default async function Page({ params: { date } }) {
  const schedules = await fetchSchedules(date);

  return (
    <div className="bg-white">
      <Client date={date} schedules={schedules.rows} />
    </div>
  );
}
