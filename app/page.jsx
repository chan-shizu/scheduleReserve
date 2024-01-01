export const dynamic = "force-dynamic";

import { Client } from "./Client";
import { sql } from "@vercel/postgres";

const fetchSchedules = async () => {
  try {
    const schedules = await sql`SELECT * FROM schedule;`;
    return schedules;
  } catch (error) {
    console.log(error);
    return { error: "error発生" };
  }
};

export default async function Home() {
  const schedules = await fetchSchedules();
  return (
    <main className="min-h-screen bg-white">
      <Client schedules={schedules.rows} />
    </main>
  );
}
