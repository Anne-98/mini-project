import React, { Fragment } from "react";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import NavbarFixed from "./components/Home/NavbarFixed";
import Logout from "./components/Login/Logout";
import Test from "./components/Test";
import CategoriesPage from "./pages/CategoriesPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";

const App = () =>{

  return(
    <HashRouter>
      <NavbarFixed/>
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/categories" element = {<CategoriesPage />} />
        <Route path="/login" element = {<LoginPage />} />
        <Route path="/signin" element = {<SignInPage/>} />
        <Route path="/logout" element = {<Logout />} />
        <Route path="*" element= {<ErrorPage />}/>
      </Routes>
    </HashRouter>
  )

}

export default App;