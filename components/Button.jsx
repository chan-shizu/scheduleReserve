export const Button = ({ text = "戻る", onClick, type }) => {
  return (
    <button
      className={
        "bg-red-400 py-5 w-full rounded-full " +
        `${type == "sub" && "bg-slate-200"}`
      }
      onClick={onClick}
    >
      {text}
    </button>
  );
};
