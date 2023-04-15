import { legacy_createStore as createStore } from "redux";

const initialState = {
  completedIds: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE_COMPLETED_TASK":
      return {
        ...state,
        completedIds: [...state.completedIds, action.payload.id],
      };
    case "OPEN_COMPLETED_TASK":
      return {
        ...state,
        completedIds: state.completedIds.filter(
          (taskId) => taskId === action.payload.id
        ),
      };
    default:
      return state;
  }
};
const store = createStore(reducer);

export default store;
