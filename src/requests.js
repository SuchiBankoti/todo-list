const request = async (params) => {
  const response = await fetch("https://api.todoist.com/rest/v2/tasks", {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(data);
  return {
    data,
    success: true,
  };
};

const postTask = async (data) => {
  await fetch("https://api.todoist.com/rest/v2/tasks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

const updateTask = async (data, id) => {
  await fetch(`https://api.todoist.com/rest/v2/tasks/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
const deleteTask = async (id, onDelete) => {
  await fetch(`https://api.todoist.com/rest/v2/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  onDelete();
};
const closeTask = async (id) => {
  await fetch(`https://api.todoist.com/rest/v2/tasks/${id}/close`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
};
const reopenTask = async (id) => {
  await fetch(`https://api.todoist.com/rest/v2/tasks/${id}/reopen`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ due_datetime: "2080-04-15T02:23:26.630657Z" }),
  });
};
const getCompletedData = async (id) => {
  const response = await fetch(`https://api.todoist.com/rest/v2/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export {
  request,
  postTask,
  updateTask,
  deleteTask,
  closeTask,
  reopenTask,
  getCompletedData,
};
