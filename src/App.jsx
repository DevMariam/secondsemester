import { Route, Routes } from "react-router-dom";

import AllRepository from "./components/AllRepository";
import ErrorPage from "./components/ErrorPage";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import React from "react";
import SingleRepository from "./components/SingleRepository";

const App = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Navbar setOpen={setOpen} />
      <Modal open={open} setOpen={setOpen} />
      <Routes>
        <Route element={<AllRepository />} path="/" />
        <Route element={<SingleRepository />} path="/single/:id" />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
