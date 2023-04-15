import React from "react";
import "./App.css";
import MyTable from "./protable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskDetail from "./TaskDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyTable />}></Route>
        <Route path="/task/:id" element={<TaskDetail />}></Route>
        <Route path="/task/new" element={<TaskDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
