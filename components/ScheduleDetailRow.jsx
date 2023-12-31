export const ScheduleDetailRow = ({ name, text }) => {
  return (
    <div className="">
      <dt>{name}</dt>
      <dd className="text-2xl">{text}</dd>
    </div>
  );
};
