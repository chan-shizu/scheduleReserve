export const Button = ({ text = "戻る", onClick, type, submit }) => {
  return (
    <button
      className={
        "py-5 w-full rounded-full " +
        `${type == "sub" ? "bg-slate-200" : "bg-red-400"}`
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};
