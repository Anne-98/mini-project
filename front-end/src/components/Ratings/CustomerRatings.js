import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import './../../css/Ratings/CustomerRatings.css';

const CustomerRatings = () => {

    var [rate, setRate] = useState(0)
    var params = useParams()
    let cake_makers_id = params.cake_makers_id
    var [msg, setMsg] = useState('')
    var navigate = useNavigate()
    var [rated, setRated] = useState(false)
    var location = useLocation()
    var [cakeMakersDetails, setCakeMakersDetails] = useState([])

    var order_id = location.state.order_id

    // console.log("location: ", location.state.order_id)

    const getRate = (e) => {
        
        e.target.classList.toggle('far')
        e.target.classList.toggle('fas')
        
        console.log(e.target.classList[1])

        if (e.target.classList[1] == 'fas') {
            setRate(rate + 1)
        }else{
            setRate(rate - 1)
        }
    }
    const clickConfirm = async() => {

        var {data} = await axios.post('http://localhost:8000/customer/rates/add_ratings', {cake_makers_id, rate, order_id})

        if (data.isLog) {
            if (data.success) {
                setRated(true)
            }
            setMsg(data.msg)
        }else{
            setMsg(data.msg)
        }

    }
    useEffect(async() => {
        var {data} = await axios.post('http://localhost:8000/cakemaker/profile/myprofile', {cake_makers_id})

        setCakeMakersDetails(data.data)

    }, [])

    return(
        <div>
            <h1 className="common-header text-center" style={{zIndex:"3"}}>Customer Ratings</h1>
            <div className="customer-ratings-wrapper my-auto mt-5">
                <div className="customer-ratings-container text-center my-auto">
                <h3 className="common_sub_header pb-5">We'd Love Your Feedback</h3>
                <p className="customer-ratings-content ">Feedback is very Important to us. We'd Love to get your Feedback on the Baker</p>
                {/* <h5>{rate}</h5> */}
            <p className="pt-3 customer-ratings-msg">{msg}</p>
            <div className='col-12 mb-5 mt-4' style={{color:"#f9c74f"}}>
                        <i class="far fa-star" onClick={getRate}></i>    
                        <i class="far fa-star" onClick={getRate}></i>    
                        <i class="far fa-star" onClick={getRate}></i>    
                        <i class="far fa-star" onClick={getRate}></i>    
                        <i class="far fa-star" onClick={getRate}></i>    
                    </div>
            {
                rated == false ?
                <>
                    
                    <button className="btn customer-ratings-submit-btn" onClick={clickConfirm}>Submit</button></> :
                <></>
            }
            {
                cakeMakersDetails.map((item) => {
                    return(
                        <div className="row order-details-profile-div p-3 ">
                        <Link to={`/profiles/cakemaker/${item.cake_makers_id}`}>
                            <div className="row order-details-profile-div-inner ">
                            <div className='cm-profile-img-div col-2 col-lg-4'>
                                <img src={item.profile_picture} className="order-details-profile-img" alt="..."/>
                            </div>
                            <div className='col-7 col-lg-7 order-details-profile-body my-auto mx-auto text-start'>
                                <h5 className="">{item.name}</h5>
                                <div className='order-details-body row'>
                                    <span className='details-heading col-3 col-md-2'><i className="fas fa-home"></i></span>
                                    <span className="col-7">{item.district}</span>
                                </div>
                                <div className='order-details-body row'>
                                    <span className='details-heading col-3 col-md-2'><i className="fas fa-phone"></i></span>
                                    <span className="col-7">0{item.contact_num}</span>
                                </div>
                            </div>
                            </div>
                        </Link>
                    </div>
                    )
                })
            }
            </div>
            </div>
        </div>
    )
}

export default CustomerRatings