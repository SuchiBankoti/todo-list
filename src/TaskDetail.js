import React, { useEffect, useState } from "react";
import "./Tasks.css";
import { SlCalender } from "react-icons/sl";
import { RxCross1 } from "react-icons/rx";
import { useParams, useLocation, Link } from "react-router-dom";
import getRequestHandle from "./requests";
import Tags from "./Tags";
import { formattedDate, isoDateStringToWords } from "./date";
const DEFAULT_DUE = "2080-04-15T02:23:26.630657Z";
const TaskDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [calender, setCalender] = useState(false);
  const [formData, setFormData] = useState(() => {
    if (id) {
      const {
        content,
        description,
        due: { datetime },
        labels,
      } = state.record;
      return {
        content,
        description,
        due_datetime: datetime,
        labels,
      };
    }
    return {
      content: "",
      description: "",
      due_datetime: DEFAULT_DUE,
      labels: [],
    };
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

  function post() {
    const action = {
      type: state.query,
      payload: {},
    };
    switch (state.query) {
      case "UPDATE":
        action.payload.id = id;
        action.payload.data = formData;
        break;
      case "POST":
        action.payload.data = formData;
        break;
      default:
        break;
    }
    console.log(formData);
    const fn = getRequestHandle(action);
    fn();
  }
  return (
    <div className="task-detail">
      <form className="form">
        <div className="left">
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
          <p className="date">{formattedDate}</p>
          <div className="left-bottom">
            <p className="count">{formData.description.length}</p>
            <textarea
              className="textarea"
              maxLength="1000"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="right">
          <p className="due-text">Due Date</p>
          <div className="due">
            <SlCalender onClick={() => setCalender((prev) => !prev)} />
            <p>{isoDateStringToWords(formData.due_datetime)}</p>
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
          </div>
          <Tags handleTag={{ handleAddition, handleDelete, tags }} />
        </div>
      </form>
      <div className="check-mark-container">
        <Link to={"/"}>
          <RxCross1 onClick={post} className="check-mark" />
        </Link>
      </div>
    </div>
  );
};
export default TaskDetail;
