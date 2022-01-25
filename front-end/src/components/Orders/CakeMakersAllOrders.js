import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CakeMakersAllDetails = () => {

    var params = useParams()
    var cake_makers_id = params.cake_makers_id
    var [direct, setDirect] = useState([])
    var [indirect, setIndirect] = useState([])
    var [msg, setMsg] = useState('')
    var [id, setId] = useState('')
    
    useEffect(async()=>{
        var {data} = await axios.post('http://localhost:8000/cakemaker/orders/display_orders', {cake_makers_id})

        // console.log(data.data.direct_row)
        if (data.isLog) {
            if (data.success) {
                setDirect(data.data.direct_row)
                setIndirect(data.data.indirect_row)
                setMsg(data.msg)
            }else{
                setMsg(data.msg)
            }
        }else{
            setMsg(data.msg)
        }
    }, [])

    const orderDirect = async(direct_order_id, confirm, reject)=>{
        
        let indirect_order_id = 'empty'
        let indirect_reject = 0
        let indirect_confirm = 0
        let direct_reject = reject
        let direct_confirm = confirm

        var body = {indirect_order_id, direct_order_id, indirect_reject, indirect_confirm, direct_reject, direct_confirm}
        var {data} = await axios.post('http://localhost:8000/cakemaker/order/accpect_order', body)

        if (data.success) {
            setId(direct_order_id)
        }
        console.log(data.msg)
    }
    const orderIndirect = async(indirect_order_id, confirm, reject)=>{

        let direct_order_id = 'empty'
        let direct_reject = 0
        let direct_confirm = 0
        let indirect_reject = reject
        let indirect_confirm = confirm

        var body = {indirect_order_id, direct_order_id, indirect_reject, indirect_confirm, direct_reject, direct_confirm}
        var {data} = await axios.post('http://localhost:8000/cakemaker/order/accpect_order', body)

        if (data.success) {
            setId(indirect_order_id)
        }

        console.log(data.msg)
    }

    return(
        <div>
            <br/>
            <h1 className="text-center mt-5 pt-5">Your Orders</h1>
            <div className="text-center" style={{width:"45%", float:"left"}}>
                        <h1>Direct Orders</h1>
                        {
                            direct.map((item)=>{

                                return(
                                    <div className="card m-5"  style={{width:"15rem", float:"left"}}>
                                            <div  style={{position:"absolute", top:"5px", color:"#184e77", cursor:"pointer"}} className="m-2">
                                <i onClick={(e)=>{orderDirect(item.direct_order_id, 1, 0) 
                                e.target.parentElement.parentElement.style.display = "none"

                                }}  className="fas fa-plus-circle fa-3x" ></i>
                            </div>
                            
                            <div  style={{position:"absolute", top:"5px", color:"#c9184a", right:"0", cursor:"pointer"}} className="m-2">
                                <i  onClick={(e)=>{orderDirect(item.direct_order_id, 0,1)
                                e.target.parentElement.parentElement.style.display = "none"
                                }} className="fas fa-minus-circle fa-3x"></i>
                            </div>
                            <img className="card-img-top" src={item.image} malt="Card image cap" style={{width:"15rem", height:"15rem"}}/>
                             
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                            <p className="card-text">{item.comment}</p>
                                            <p><i>{item.complete_date.substring(0,10)}</i></p>
                                            <a href="#" className="btn btn-primary">Design</a>
                            </div>
                                        </div>
                                )
                            })
                        }
                    </div>

    <div className="text-center">
        <h1>Indirect Orders</h1>
        {
            indirect.map((item)=>{

                return(
                    <div  className="card m-5 justify-content" style={{width:"15rem", float:"left" }}>
                        <div style={{backgroundColor:"black"}}>
                            <div  style={{position:"absolute", top:"5px", color:"#184e77", cursor:"pointer"}} className="m-2">
                                
                                <i onClick={(e)=>{orderIndirect(item.indirect_order_id, 1, 0)
                                e.target.parentElement.parentElement.parentElement.style.display = "none"
                                }} className="fas fa-plus-circle fa-3x"></i>
                            </div>
                            <div style={{position:"absolute", top:"5px", color:"#c9184a", right:"0", cursor:"pointer"}} className="m-2" >
                                
                                <i onClick={(e)=>{orderIndirect(item.indirect_order_id, 0, 1)
                                e.target.parentElement.parentElement.parentElement.style.display = "none"
                                }} className="fas fa-minus-circle fa-3x"></i>
                            </div>
                        </div>
                        <img className="card-img-top" src={item.image} malt="Card image cap" style={{width:"15rem", height:"15rem"}}/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">{item.comment}</p>
                            <p><i>{item.order_date.substring(0,10)}</i></p>m
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                </div>
                )
            })
        }
    </div>
        </div>
    )
}

export default CakeMakersAllDetails