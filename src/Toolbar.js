import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

const SearchToolBarRender = () => {
  const [searchValue, setSearchvalue] = useState("");
  const handleSearch = (value) => {
    setSearchvalue(value);
    console.log(searchValue);
  };
  return [
    <>
      <Input.Search
        placeholder="Search Name"
        onSearch={handleSearch}
        style={{ width: 200 }}
        key="name-search"
        prefix={<SearchOutlined />}
      />
    </>,
  ];
};

export default SearchToolBarRender;
