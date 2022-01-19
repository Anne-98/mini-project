import React, { Fragment } from "react";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import NavbarFixed from "./components/Home/NavbarFixed";
import Logout from "./components/Login/Logout";
import IndirectOrders from "./components/Orders/IndirectOrders";
import CakeMakerProfile from "./components/Profiles/CakeMakerProfile";
import CustomerProfile from "./components/Profiles/CustomerProfile";
import Test from "./components/Test";
import CategoriesPage from "./pages/CategoriesPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import CakeMakerEditProfile from "./components/Profiles/CakeMakerEditProfile";
import CustomerEditProfile from "./components/Profiles/CustomerEditProfile";
import CustomerOrderHistory from "./components/Orders/CustomerOrderHistory";

const App = () =>{

  return(
    <HashRouter>
      <NavbarFixed/>
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/categories" element = {<CategoriesPage />} />
        <Route path="/login" element = {<LoginPage />} />
        <Route path="/user/:cake_makers_id" element = {<HomePage />} />
        <Route path="/customer/logged/:customer_id" element = {<HomePage />} />
        <Route path="/signin" element = {<SignInPage/>} />
        <Route path="/profiles/customer/:customer_id" element = {<CustomerProfile />} />
        <Route path="/profiles/cakemaker/:cake_makers_id" element = {<CakeMakerProfile />} />
        <Route path="/profiles/cakemaker/edit/:cake_makers_id" element={<CakeMakerEditProfile/>} />
        <Route path="/profiles/customer/edit/:customer_id" element={<CustomerEditProfile/>} />
        <Route path="/orders/indirect/:customer_id" element={<IndirectOrders />}/>
        <Route path="/customer/orders/history/:customer_id" element={<CustomerOrderHistory />}/>
        <Route path="*" element= {<ErrorPage />}/>
      </Routes>
    </HashRouter>
  )

}

export default App;