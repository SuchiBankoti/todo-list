const currentDate = new Date();
const year1 = currentDate.getFullYear();
const month1 = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day1 = currentDate.getDate().toString().padStart(2, "0");
const formattedDate = `${year1}-${month1}-${day1}`;

function getStatus(datetime, is_completed) {
  const now = new Date();
  const dueDate = new Date(datetime);
  if (now > dueDate && !is_completed) {
    return "Overdue";
  } else if (now < dueDate && !is_completed) {
    return "Open";
  } else {
    return "Done";
  }
}

const isoDateStringToWords = (isoDateString) => {
  const date = new Date(isoDateString);
  const day = date.toLocaleString("default", { weekday: "long" });
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const dateOfMonth = date.getDate();

  return `${day}, ${dateOfMonth} ${month} ${year}`;
};

export { formattedDate, getStatus, isoDateStringToWords };
