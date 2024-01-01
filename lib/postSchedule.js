"use server";

import { sql } from "@vercel/postgres";

export const postSchedule = async (schedule) => {
  console.log(schedule);
  try {
    const {
      title,
      name,
      date,
      startTime,
      endTime,
      description,
      optionHighTension,
      optionRoom,
      optionFashionable,
      optionCar,
      optionGuitar,
      optionKindness,
    } = schedule;
    const response =
      await sql`INSERT INTO schedule (title, name, date, start_time, end_time, description, option_high_tension, option_room, option_fashionable, option_car, option_guitar, option_kindness) VALUES (${title}, ${name}, ${date}, ${startTime}, ${endTime}, ${description}, ${optionHighTension}, ${optionRoom}, ${optionFashionable}, ${optionCar}, ${optionGuitar}, ${optionKindness});`;
    return;
  } catch (error) {
    console.log(error);
    return { error: "error発生" };
  }
};
