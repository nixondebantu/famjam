import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import Homepage from "./pages/Homepage";
import JustAsk from "./pages/JustAsk";
import Majority from "./pages/Majority";
import MemoryLane from "./pages/MemoryLane";
import SingItOut from "./pages/SingItOut";
export default function App() {
  return (
    <div className="px-4">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/justask" element={<JustAsk />} />
          <Route path="/singitout" element={<SingItOut />} />
          <Route path="/memorylane" element={<MemoryLane />} />
          <Route path="/majority" element={<Majority />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
