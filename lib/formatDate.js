export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = ("00" + (date.getMonth() + 1)).slice(-2);
  const day = ("00" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};
