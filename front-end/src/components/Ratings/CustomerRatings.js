import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const CustomerRatings = () => {

    var [rate, setRate] = useState(0)
    var params = useParams()
    let cake_makers_id = params.cake_makers_id
    var [msg, setMsg] = useState('')
    var navigate = useNavigate()
    var [rated, setRated] = useState(false)
    var location = useLocation()

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

    return(
        <div>
            <h1 className="common-header text-center" style={{zIndex:"3"}}>Customer Ratings</h1>
            <h5>{rate}</h5>
            <p>{msg}</p>
            {
                rated == false ?
                <>
                <div className='col-12 mb-3' style={{color:"#f9c74f"}}>
                    <i class="far fa-star" onClick={getRate}></i>    
                    <i class="far fa-star" onClick={getRate}></i>    
                    <i class="far fa-star" onClick={getRate}></i>    
                    <i class="far fa-star" onClick={getRate}></i>    
                    <i class="far fa-star" onClick={getRate}></i>    
                </div>
                <button className="btn" onClick={clickConfirm}>Submit</button></> :
                <></>
            }
        </div>
    )
}

export default CustomerRatings