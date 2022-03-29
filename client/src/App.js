import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/LandingPage.jsx";
import { Home } from "./components/HomePage/HomePage.jsx";
import { Create } from "./components/Create/Create.jsx";
import { Details } from "./components/Details/Details.jsx";
import { ErrorPage } from "./components/ErrorPage/ErrorPage.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/pokemon/index" element={<Home />} />
        <Route exact path="/pokemon/:id" element={<Details />} />
        <Route exact path="/create" element={<Create />} />
        {/* <Route exact path="/about" element={<AbautMe />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
