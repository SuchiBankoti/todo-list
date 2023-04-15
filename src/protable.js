import { React, useRef, useState } from "react";
import { ProTable } from "@ant-design/pro-table";
import SearchToolBarRender from "./Toolbar";
import { request, deleteTask } from "./requests";
import { Link } from "react-router-dom";
import { getStatus } from "./date";
import { useSelector } from "react-redux";
import DeleteIcon from "./DeleteTask";
const MyTable = () => {
  const completedTasks = useSelector((state) => state.completedTasks);
  console.log(completedTasks);
  const tableRef = useRef(null);
  const columns = [
    {
      title: "Title",
      key: "content",
      dataIndex: "content",
      sorter: (a, b) => a.content.localeCompare(b.content),

      render: (text, record) => (
        <Link to={`/${record.id}`} state={{ record }}>
          {text}
        </Link>
      ),
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      filters: [
        {
          text: "Overdue",
          value: "overdue",
        },
        {
          text: "Open",
          value: "open",
        },
      ],
      onFilter: (value, record) => console.log(record),
      render: (text, record) => (
        <h3>{getStatus(record.due.datetime, record.is_completed)}</h3>
      ),
    },
    {
      title: "Delete Task",
      key: "delete",
      dataIndex: "delete",
      render: (text, record) => (
        <DeleteIcon
          onDelete={() => {
            deleteTask(record.id, tableRef.current.reload);
          }}
        />
      ),
    },
    {
      title: "Tags",
      key: "labels",
      dataIndex: "labels",
      render: (text, record) => (
        <span>
          {record.labels.map((str, i) => (
            <h5 key={i}>{str}</h5>
          ))}
        </span>
      ),
    },
  ];
  return (
    <>
      <ProTable
        headerTitle="active tasks"
        search={false}
        actionRef={tableRef}
        request={request}
        rowKey="id"
        columns={columns}
        toolBarRender={SearchToolBarRender}
        footer={() => <div>footer</div>}
      />
      <div>
        <Link to={"/new"}>New Note</Link>
      </div>
    </>
  );
};
export default MyTable;
