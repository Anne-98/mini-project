import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminActivities from '../components/Admin/AdminAllActivities';
import AdminLogin from '../components/Admin/AdminLogin';
import { OrderContext } from '../components/Context/OrderContext';
import { UserIdContext } from '../components/Context/UserIdContext';
import { UserTypeContext } from '../components/Context/UserTypeContext';

const AdminPage = () => {
    let [type, setType] = useContext(UserTypeContext)
    let [userId, setUserId] = useContext(UserIdContext)
    var navigate = useNavigate()
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
    return(
        <div className=''>
            <h1 className="text-center admin-header" style={{zIndex:"3", margin:"0"}}>Welcome to Admin Page of the Cake Mount</h1>
            <button className='btn admin-logout-btn' onClick={LogOut}>Logout</button>
            <AdminActivities />
        </div>
    )
}

export default AdminPage