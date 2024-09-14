import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Singin from "./Components/Singin";
import Forgot from "./Components/Forgot";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Singin />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
