export const ScheduleDetailRow = ({ name, text }) => {
  return (
    <div className="py-4">
      <dt>{name}</dt>
      <dd className="text-2xl">{text}</dd>
    </div>
  );
};
