import React from "react";
import { useSelector, useDispatch } from "react-redux";

const CompleteTasks = () => {
  const completedIds = useSelector((state) => state.completedIds);
  completedIds.map((id) => {});
  reopenTask(id);
  dispatch({ type: "OPEN_COMPLETED_TASK", payload: { id } });
  return (
    <div>
      <div>Task</div>
      <button>reopen</button>
      <button>Delete</button>
    </div>
  );
};
export default CompleteTasks;
