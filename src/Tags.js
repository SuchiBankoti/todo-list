import { React, useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const Tags = (props) => {
  const { handleAddition, handleDelete, tags } = props.handleTag;
  return (
    <div className="Tag">
      <h1> React Tags Example </h1>
      <div>
        <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          inputFieldPosition="bottom"
        />
      </div>
    </div>
  );
};
export default Tags;
