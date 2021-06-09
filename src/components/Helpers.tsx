export const Fetcher = () => {
  return {};
};

export const FormatDate = (date: string) => {
  const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let d = new Date(date);
  return `${Months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
};
