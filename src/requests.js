const get = async (params) => {
  const response = await fetch("https://api.todoist.com/rest/v2/tasks", {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
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

const updateTask = async (id, data) => {
  await fetch(`https://api.todoist.com/rest/v2/tasks/${id}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
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

const getRequestHandle = (action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case "POST":
      return () => postTask(payload.data);
    case "UPDATE":
      return () => updateTask(payload.id, payload.data);
    case "CLOSE":
      return () => closeTask(payload.id);
    case "DELETE":
      return () => deleteTask(payload.id, payload.onDelete);
    default:
      return () => get();
  }
};
export default getRequestHandle;
