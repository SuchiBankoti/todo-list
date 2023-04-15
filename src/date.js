const currentDate = new Date();
const year1 = currentDate.getFullYear();
const month1 = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day1 = currentDate.getDate().toString().padStart(2, "0");
const formattedDate = `${year1}-${month1}-${day1}`;

function getStatus(datetime, is_completed) {
  const now = new Date();
  const dueDate = new Date(datetime);
  if (now > dueDate && !is_completed) {
    return "overdue";
  } else if (now < dueDate && !is_completed) {
    return "open";
  } else {
    return "done";
  }
}

export { formattedDate, getStatus };
