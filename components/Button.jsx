export const Button = ({ text = "戻る", onClick }) => {
  return (
    <button className=" bg-red-400 py-5 w-full rounded-full" onClick={onClick}>
      {text}
    </button>
  );
};
