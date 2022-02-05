import React, { Fragment } from "react";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import NavbarFixed from "./components/Home/NavbarFixed";
import Logout from "./components/Login/Logout";
import IndirectOrders from "./components/Orders/CustomerIndirectOrders";
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
import {UserIdContextProvider} from "./components/Context/UserIdContext";
import { UserTypeContextProvider } from "./components/Context/UserTypeContext";
import CakeMakersAllDetails from "./components/Orders/CakeMakersAllOrders";
import CakeMakerCalender from "./components/Orders/CakeMakerCalender";
import OrderDetails from "./components/Orders/OrderDeitals";
import CakeMakerAllProfiles from "./components/Profiles/CakeMakerAllProfiles";
import DesignDetails from "./components/Orders/DesignDetails";
import CustomerDirectOrders from "./components/Orders/CustomerDirectOrders";
import CakeMakerUploadDesigns from "./components/Designs/CakeMakerUploadDesigns";
import { OrderContextProvider } from "./components/Context/OrderContext";
import EditDesigns from "./components/Designs/EditDesigns";
import CustomerNotifications from "./components/Orders/CustomerNotifications";
import Search from "./components/Common/Search";


const App = () =>{

  return(
    <HashRouter>
      {/* <IsLogContextProvider> */}
        <UserIdContextProvider>
          <UserTypeContextProvider>
            <OrderContextProvider>
              <NavbarFixed />
              <Routes>
                <Route path="/" element = {<HomePage />} />
                <Route path="/categories" element = {<CategoriesPage />} />
                <Route path="/login" element = {<LoginPage />} />
                <Route path="/user/:cake_makers_id" element = {<HomePage />} />
                <Route path="/search/:searched_item" element={<Search />}/>
                <Route path="/customer/logged/:customer_id" element = {<HomePage />} />
                <Route path="/signin" element = {<SignInPage/>} />
                <Route path="/profiles/customer/:customer_id" element = {<CustomerProfile />} />
                <Route path="/profiles/cakemaker/:cake_makers_id" element = {<CakeMakerProfile />} />
                <Route path="/profiles/cakemaker/edit/:cake_makers_id" element={<CakeMakerEditProfile/>} />
                <Route path="/profiles/customer/edit/:customer_id" element={<CustomerEditProfile/>} />
                <Route path="/orders/indirect/:customer_id" element={<IndirectOrders />}/>
                <Route path="/customer/notifications/:customer_id" element={<CustomerNotifications />}/>
                <Route path="/orders/direct/:design_id" element={<CustomerDirectOrders />}/>
                <Route path="/customer/orders/history/:customer_id" element={<CustomerOrderHistory />}/>
                <Route path="/cakemaker/orders/all/:cake_makers_id" element={<CakeMakersAllDetails />} />
                <Route path="/cakemaker/calender/:cake_makers_id" element={<CakeMakerCalender />} />
                <Route path="/orders/order/details/:order_id" element={<OrderDetails />}/>
                <Route path="/profiles/allcakemakers" element={<CakeMakerAllProfiles />}/>
                <Route path="/designs/details/:design_id" element={<DesignDetails />}/>
                <Route path='/cakemaker/designs/new/:cake_makers_id' element={<CakeMakerUploadDesigns />}/>
                <Route path='/cakemaker/designs/edit/:design_id' element={<EditDesigns />}/>
                <Route path="*" element= {<ErrorPage />}/>
              </Routes>
            </OrderContextProvider>
          </UserTypeContextProvider>
        </UserIdContextProvider>
      {/*</IsLogContextProvider> */}
    </HashRouter>
  )

}

export default App;