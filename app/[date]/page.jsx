import { Client } from "./Client";

export default function Page({ params: { date } }) {
  console.log("###########################");
  console.log(date);
  return (
    <div className="bg-white">
      <Client date={date} />
    </div>
  );
}
