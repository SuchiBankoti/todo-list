import React, { useEffect, useRef, useState } from "react";
import "./Tasks.css";
import { useParams, useLocation, Link } from "react-router-dom";
import { postTask, updateTask, closeTask, reopenTask } from "./requests";
import { useDispatch } from "react-redux";
import { formattedDate, getStatus } from "./date";
import { BsCircle } from "react-icons/bs";
import Tags from "./Tags";

const TaskDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const [calender, setCalender] = useState(false);
  const [formData, setFormData] = useState(() => {
    if (id) {
      const {
        content,
        description,
        due: { datetime },
        is_completed,
        labels,
      } = location.state.record;
      return {
        content,
        description,
        due_datetime: datetime,
        is_completed,
        labels,
      };
    } else {
      return {
        content: "",
        description: "",
        due_datetime: "2080-04-15T02:23:26.630657Z",
        is_completed: false,
        labels: [],
      };
    }
  });
  const [tags, setTags] = useState(
    formData.labels.map((str) => ({
      id: str,
      text: str,
    }))
  );
  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        labels: tags.map(({ text }) => text),
      };
    });
  }, [tags.length]);
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  function handleChange(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  function toggleTask() {
    if (formData.is_completed) {
      setFormData((prev) => ({ ...prev, is_completed: !prev.is_completed }));
    } else {
      setFormData((prev) => ({ ...prev, is_completed: !prev.is_completed }));
    }
  }

  function post(event) {
    event.preventDefault();
    if (id && !formData.is_completed) {
      updateTask(formData, id);
    } else if (!id && !formData.is_completed) {
      postTask(formData);
    } else if (id && formData.is_completed) {
      dispatch({
        type: "CLOSE_COMPLETED_TASK",
        payload: { id },
      });
      closeTask(id);
    } else {
      return;
    }
  }
  return (
    <div className="task-detail">
      <p>time and date and day1</p>
      <form onSubmit={post} className="form">
        <div>
          {id ? (
            <BsCircle
              style={{
                background: formData.is_completed ? "black" : "transparent",
              }}
              onClick={toggleTask}
              className="circle"
            />
          ) : (
            ""
          )}
        </div>
        <input
          className="title"
          placeholder="Title"
          type="text"
          name="content"
          value={formData.content}
          onChange={handleChange}
          maxLength="100"
          required
        />
        <textarea
          className="textarea"
          maxLength="1000"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label onClick={() => setCalender((prev) => !prev)}>
          Set Due Date and Time
        </label>
        {calender ? (
          <input
            className="due-date"
            type="datetime-local"
            name="due_datetime"
            value={formData.due_datetime}
            onInput={handleChange}
          />
        ) : (
          ""
        )}

        <Tags handleTag={{ handleAddition, handleDelete, tags }} />
        <input type="submit" value="submit" className="submit" />
      </form>
      <div>{getStatus(formData.due_datetime, formData.is_completed)}</div>
    </div>
  );
};
export default TaskDetail;
