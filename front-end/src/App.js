import React, { Fragment, useContext } from "react";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import NavbarFixed from "./components/Home/NavbarFixed";
import IndirectOrders from "./components/Orders/CustomerIndirectOrders";
import CakeMakerProfile from "./components/Profiles/CakeMakerProfile";
import CustomerProfile from "./components/Profiles/CustomerProfile";
import CategoriesPage from "./components/Common/Categories";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import CakeMakerEditProfile from "./components/Profiles/CakeMakerEditProfile";
import CustomerEditProfile from "./components/Profiles/CustomerEditProfile";
import CustomerOrderHistory from "./components/Orders/CustomerOrderHistory";
import {UserIdContextProvider} from "./components/Context/UserIdContext";
import { UserTypeContext, UserTypeContextProvider } from "./components/Context/UserTypeContext";
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
import CakeMakerLogin from "./components/Login/CakeMakerLogin";
import CustomerLogin from "./components/Login/CustomerLogin";
import CustomerSignIn from "./components/SignIn/CustomerSignIn";
import CakeMakerSignIn from "./components/SignIn/CakeMakerSignIn";
import WorkPlace from "./components/Designs/Workplace";
import IsConfirmDesignProvider from "./components/Context/IsConfirmDesign";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminSignIn from "./components/Admin/AdminSignIn";
import AdminPage from "./pages/AdminPage";
import AdminCakeMaker from "./components/Admin/AdminCakeMaker";
import AdminDashBoard from "./components/Admin/AdminDashBoard";
import CakeMakerOverdueOrders from "./components/Orders/CakeMakerOverdueOrders";
import CreatePost from "./components/Post/CreatePost";
import Chat from "./components/Common/Chat";
import ChatList from "./components/Common/ChatList";
import Footer from "./components/Home/Footer";
import OneCategory from "./components/Common/OneCategory";


const App = () =>{

//   var [type, setType] = useContext(UserTypeContext)
// type = 'customer'
var type = localStorage.getItem('type')
var orders = localStorage.getItem('orders')

  console.log("type: ",type)
  return(
    <BrowserRouter>
      {/* <IsLogContextProvider> */}
        <UserIdContextProvider>
          <UserTypeContextProvider>
            <OrderContextProvider>
              <IsConfirmDesignProvider>
                
                {/* {
                  type != 'admin' ?
                  <> */}
                    {
                      type != 'admin' ?
                      <NavbarFixed />: type == 'admin' && orders == 1 ? <NavbarFixed/> : <></>
                    }
                    <Routes>
                      <Route path="/" element = {<HomePage />} />
                      <Route path="/categories" element = {<CategoriesPage />} />
                      <Route path="/workplace" element = {<WorkPlace />} />
                      <Route path="/login" element = {<LoginPage />} />
                      <Route path="/login/customer" element = {<CustomerLogin />} />
                      <Route path="/login/cakemaker" element = {<CakeMakerLogin />} />
                      <Route path="/login/admin/:admin_key" element = {<AdminLogin />} />
                      <Route path="/user/:cake_makers_id" element = {<HomePage />} />
                      <Route path="/search/:searched_item" element={<Search />}/>
                      <Route path="/customer/logged/:customer_id" element = {<HomePage />} />
                      <Route path="/signin" element = {<SignInPage/>} />
                      <Route path="/signin/admin/:admin_key" element={<AdminSignIn />}/>
                      <Route path="/signin/customer" element = {<CustomerSignIn />} />
                      <Route path="/signin/cakemaker" element = {<CakeMakerSignIn />} />
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
                      <Route path="*" element= {<HomePage />}/>
                      <Route path="/admin/workplace/:admin_id" element={<AdminPage />}/>
                      <Route path="/admin/workplace/dashboard/:admin_id" element={<AdminDashBoard />}/>
                      <Route path="/admin/workplace/cakemaker" element={<AdminCakeMaker />}/> 
                      <Route path="/cakemaker/overdues/:warnings" element={<CakeMakerOverdueOrders />}/> 
                      <Route path="/cakemaker/create/post/:cakemakers_name" element={<CreatePost />}/> 
                      <Route path="/common/chat/:userId" element={<Chat />}/> 
                      <Route path="/chat/:userId" element={<ChatList />}/> 
                      <Route path="/category/selected_category/:category_name" element={<OneCategory/>} />
                    </Routes>
                    
                    {/* </Routes> */}
                  {/* </> :
                    <Routes> */}
                  
                {/* } */}
              </IsConfirmDesignProvider>
            </OrderContextProvider>
          </UserTypeContextProvider>
        </UserIdContextProvider>
      {/*</IsLogContextProvider> */}
    </BrowserRouter>
  )

}

export default App;