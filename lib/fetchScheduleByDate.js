"use server";

import { sql } from "@vercel/postgres";

export const fetchSchedulesByDate = async (date) => {
  try {
    const schedules = await sql`SELECT * FROM schedule WHERE date = ${date};`;
    return schedules;
  } catch (error) {
    console.log(error);
    return { error: "error発生" };
  }
};
