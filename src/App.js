import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import JustAsk from "./pages/JustAsk";
import Majority from "./pages/Majority";
import MemoryLane from "./pages/MemoryLane";
import SingItOut from "./pages/SingItOut";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/justask" element={<JustAsk />} />
          <Route path="/singitout" element={<SingItOut />} />
          <Route path="/memorylane" element={<MemoryLane />} />
          <Route path="/majority" element={<Majority />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
