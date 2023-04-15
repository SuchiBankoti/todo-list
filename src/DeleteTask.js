import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const DeleteIcon = (props) => {
  return <AiFillDelete onClick={props.onDelete} />;
};
export default DeleteIcon;
