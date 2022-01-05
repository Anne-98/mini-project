import React, { Fragment } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import NavbarFixed from "./components/Home/NavbarFixed";
import Test from "./components/Test";
import HomePage from "./pages/HomePage";
import WorkPlacePage from "./pages/WorkPlacePage";

const App = () =>{

  return(
    <HashRouter>
        <NavbarFixed />
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </HashRouter>
  )

}

export default App;