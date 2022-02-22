import './../../css/Admin/AdminDashboard.css';
import $ from 'jquery';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserTypeContext } from '../Context/UserTypeContext';
import { UserIdContext } from '../Context/UserIdContext';
import axios from 'axios';
import AdminCakeMaker from "./AdminCakeMaker";
import AdminCustomer from "./AdminCustomer";
import AdminPost from "./AdminPost";
import AdminAllActivities from './AdminAllActivities';
import AdminViewPost from './AdminViewPost';

// dashboard stylings...........................................
const mobileScreen = window.matchMedia("(max-width: 990px )");
    $(document).ready(function () {
        $(".dashboard-nav-dropdown-toggle").click(function () {
            $(this).closest(".dashboard-nav-dropdown")
                .toggleClass("show")
                .find(".dashboard-nav-dropdown")
                .removeClass("show");
            $(this).parent()
                .siblings()
                .removeClass("show");
        });
        $(".menu-toggle").click(function () {
            if (mobileScreen.matches) {
                $(".dashboard-nav").toggleClass("mobile-show");
            } else {
                $(".dashboard").toggleClass("dashboard-compact");
            }
        });
    });
const AdminDashBoard = () => {

    var params = useParams()
    var name = params.admin_name
    let [type, setType] = useContext(UserTypeContext)
    let [userId, setUserId] = useContext(UserIdContext)
    var navigate = useNavigate()
    var [table, setTable] = useState('dashboard')
    var [postId, setPostId] = useState('')
    console.log(userId)


    const refreshPage = () => {
        window.location.reload(true)
    }

    const LogOut = async() => {
        
        var {data} = await axios.get('http://localhost:8000/general/logout')
        // console.log("isLog",data.isLog)

        if (!data.isLog) {
            console.log(type, userId)
            navigate('/')
            localStorage.setItem('type',"")
            localStorage.setItem('userId',"")
            localStorage.setItem('orders',"")
            setUserId("")
            setType("")
        }

        refreshPage()
    }
    
    const clickHome = () =>{
        navigate('/')
        localStorage.setItem('orders', '1')
        refreshPage()
    }

    const changeTable = (x, y) => {
        setTable(x)
        setPostId(y)
    }

    return(
        <div className='dashboard'>
    <div className="dashboard-nav">
        <header><a href="#!" className="menu-toggle"><i className="fas fa-bars"></i></a>
        <a className="navbar-brand" href="#">Cake Mount</a></header>
        <nav className="dashboard-nav-list">
            <a href="#" onClick={clickHome} className="dashboard-nav-item"><i className="fas fa-home"></i>
            Home </a>
            <a href="#" className="dashboard-nav-item"  onClick={()=>{setTable('dashboard')}} ><i className="fas fa-tachometer-alt"></i> Dashboard</a>
            <a href="#" onClick={()=>{setTable('post')}} className="dashboard-nav-item"><i class="fas fa-address-card"></i> Posts </a>
            <div className='dashboard-nav-dropdown'>
                <a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle"><i className="fas fa-photo-video"></i> Media </a>
                <div className='dashboard-nav-dropdown-menu'>
                    <a href="#"                     className="dashboard-nav-dropdown-item">All</a>
                    <a href="#" className="dashboard-nav-dropdown-item">Recent</a>
                    <a href="#" className="dashboard-nav-dropdown-item">Images</a>
                    <a href="#" className="dashboard-nav-dropdown-item">Video</a>
                </div>
            </div>
            <div className='dashboard-nav-dropdown'><a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle"><i
                    className="fas fa-users"></i> Users </a>
                <div className='dashboard-nav-dropdown-menu'>
                    {/* <a href="#" className="dashboard-nav-dropdown-item">All</a> */}
                    <a href="#" className="dashboard-nav-dropdown-item" 
                    onClick={(e)=>{
                        setTable('customer');
                    }}>Customers</a>
                    <a href="#" className="dashboard-nav-dropdown-item" 
                    onClick={(e)=>{
                        setTable('cakemaker');
                        }}>Cakemakers</a>
                    {/* <a href="#" className="dashboard-nav-dropdown-item">Banned</a> */}
                    {/* <a href="#" className="dashboard-nav-dropdown-item">New</a> */}
                </div>
            </div>
            <div className='dashboard-nav-dropdown'><a href="#!" className="dashboard-nav-item dashboard-nav-dropdown-toggle"><i
                    className="fas fa-money-check-alt"></i> Payments </a>
                <div className='dashboard-nav-dropdown-menu'><a href="#"
                                                            className="dashboard-nav-dropdown-item">All</a><a
                        href="#" className="dashboard-nav-dropdown-item">Recent</a><a
                        href="#" className="dashboard-nav-dropdown-item"> Projections</a>
                </div>
            </div>
            <a href="#" className="dashboard-nav-item"><i className="fas fa-cogs"></i> Settings </a><a
                    href="#" className="dashboard-nav-item"><i className="fas fa-user"></i> Profile </a>
          <div className="nav-item-divider"></div>
          <a href="#" onClick={LogOut} className="dashboard-nav-item"><i className="fas fa-sign-out-alt"></i> Logout </a>
        </nav>
    </div>
    <div className='dashboard-app'>
        <header className='dashboard-toolbar'>
            <a href="#!" className="menu-toggle"><i className="fas fa-bars"></i></a> 
            <h1 className="admin-header" >Admin Page of the Cake Mount</h1>    
        </header>
        <div className='dashboard-content'>
            <div className='container'>
                <div className='card'>
                    <div className='card-header'>
                        <h1 className='text-capitalize'>Welcome back {name}</h1>
                    </div>
                    <div className='card-body'>
                        {
                    table == 'cakemaker' ? <AdminCakeMaker /> : table == 'customer' ? <AdminCustomer /> : table == 'post' ? <AdminPost table = {changeTable}/> : table == 'dashboard' ? <AdminAllActivities /> : table == 'view_post' ? <AdminViewPost postId = {postId}/> : <></>
                }
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default AdminDashBoard