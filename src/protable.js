import React from "react";
import { ProTable } from "@ant-design/pro-table";

const MyTable = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Due Date",
      dataIndex: "duedate",
      key: "duedate",
    },
  ];

  const dataSource = [
    {
      key: "1",
      name: "John Brown",
      description: "he lives near the river",
      duedate: "12/07/23",
    },
    {
      key: "2",
      name: "Jim Green",
      description: "he livenear mountains",
      duedate: "11/05/23",
    },
    {
      key: "3",
      name: "Joe Black",
      description: "he lives in deser",
      duedate: "01/05/23",
    },
  ];

  return <ProTable columns={columns} dataSource={dataSource} rowKey="key" />;
};

export default MyTable;
