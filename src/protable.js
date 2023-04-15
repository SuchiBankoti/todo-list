import { React, useRef, useState, useMemo } from "react";
import { ProTable } from "@ant-design/pro-table";
import { AiOutlineFileAdd } from "react-icons/ai";
import { SlTag } from "react-icons/sl";
import getRequestHandle from "./requests";
import { Link } from "react-router-dom";
import { getStatus } from "./date";
import DeleteIcon from "./DeleteTask";
import { Checkbox } from "antd";

const MyTable = () => {
  console.log("reload");
  const tableRef = useRef(null);
  const [tags, setTags] = useState([]);
  const columns = useMemo(() => {
    return [
      {
        title: "Title",
        key: "content",
        dataIndex: "content",
        sorter: (a, b) => a.content.localeCompare(b.content),
        render: (text, record) => (
          <div className="task-title">
            <Checkbox
              onClick={getRequestHandle({
                type: "CLOSE",
                payload: { id: record.id },
              })}
              className="check-box"
            />

            <Link
              to={`/task/${record.id}`}
              state={{ record, query: "UPDATE" }}
              className="link"
            >
              {text}
            </Link>
          </div>
        ),
      },
      {
        title: "Status",
        key: "status",
        dataIndex: "status",
        filters: [
          {
            text: "Overdue",
            value: "Overdue",
          },
          {
            text: "Open",
            value: "Open",
          },
        ],
        onFilter: (value, record) =>
          getStatus(record.due.datetime, record.is_completed) === value,
        render: (text, record) => (
          <p>{getStatus(record.due.datetime, record.is_completed)}</p>
        ),
      },
      {
        title: "Delete Task",
        key: "delete",
        dataIndex: "delete",
        render: (text, record) => (
          <DeleteIcon
            onDelete={getRequestHandle({
              type: "DELETE",
              payload: { id: record.id, onDelete: tableRef.current.reload },
            })}
          />
        ),
      },
      {
        title: "Tags",
        key: "labels",
        dataIndex: "labels",
        filters: tags,
        onFilter: (value, record) => record.labels.includes(value),
        render: (text, record) => (
          <span>
            {record.labels.map((str, i) => (
              <div key={i} className="tag-container">
                <SlTag className="tag-icon" />
                <p className="tag-text">{str}</p>
              </div>
            ))}
          </span>
        ),
      },
    ];
  }, [tags]);

  async function requestOnLoad() {
    const getRecords = getRequestHandle();
    const obj = await getRecords();
    const response = await fetch(
      "https://api.todoist.com/rest/v2/labels/shared",
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const tags = await response.json();
    setTags(tags.map((str) => ({ text: str, value: str })));
    return obj;
  }
  return (
    <div className="table">
      <ProTable
        search={false}
        actionRef={tableRef}
        request={requestOnLoad}
        rowKey="id"
        columns={columns}
      />
      <div className="new-note">
        <AiOutlineFileAdd />
        <Link to={"/task/new"} state={{ query: "POST" }} className="link">
          New Note
        </Link>
      </div>
    </div>
  );
};
export default MyTable;
