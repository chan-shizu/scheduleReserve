"use server";

import { sql } from "@vercel/postgres";

export const postSchedule = async (schedule) => {
  console.log(schedule);
  try {
    const { title, name, date, startTime, endTime, description } = schedule;
    const response =
      await sql`INSERT INTO schedule (title, name, date, start_time, end_time, description) VALUES (${title}, ${name}, ${date}, ${startTime}, ${endTime}, ${description});`;
    return;
  } catch (error) {
    console.log(error);
    return { error: "error発生" };
  }
};
