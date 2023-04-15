import { React } from "react";
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
      <ReactTags
        tags={tags}
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="top"
      />
    </div>
  );
};
export default Tags;
