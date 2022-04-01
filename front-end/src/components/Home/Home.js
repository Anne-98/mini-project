import React,{Fragment, useContext, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import video_1 from './../../videos/video_1.mp4';
import './../../css/home.css';
import {Container, Row, Col} from 'react-bootstrap';
import { OrderContext } from "../Context/OrderContext";
import axios from "axios";


const Home = () => {

    var params = useParams()
    const [orders, setOrders] = useContext(OrderContext)
    
    
    var cake_makers_id = localStorage.getItem('userId')
    console.log(cake_makers_id)
    var type = localStorage.getItem('type')

        useEffect(async()=>{
            if (type == 'cakemaker') {
                
                var {data} = await axios.post('http://localhost:8000/cakemaker/orders/display_orders', {cake_makers_id})
                console.log(data.success)

                if (!data.success) {
                    localStorage.setItem('orders', '0')
                    setOrders('0')
                }else if(data.data.direct_row.length > 0 || data.data.indirect_row.length > 0){
                    var number_of_orders = data.data.direct_row.length + data.data.indirect_row.length
                    
                    localStorage.setItem('orders', number_of_orders)
                    setOrders(number_of_orders)
                }else{
                    localStorage.setItem('orders', '0')
                    setOrders('0')
                }
         }else if (type == 'customer') {
                
                var {data} = await axios.post('http://localhost:8000/customer/notifications/display', {cus_id:cake_makers_id})


                if (!data.success) {
                    localStorage.setItem('orders', '0')
                    setOrders('0')
                }else if(data.data.direct_row.length >= 0 || data.data.indirect_row.length >= 0){
                    var number_of_notifications = data.data.direct_row.length + data.data.indirect_row.length
                    
                    localStorage.setItem('orders', number_of_notifications)
                    setOrders(number_of_notifications)
                }else{
                    localStorage.setItem('orders', '0')
                    setOrders('0')
                }
         }
        }, [])

    return(
        <Fragment>
            <div className="" id="home-wrapper">
                <div id="home-video-div">
                    <video autoPlay muted loop id="home-video">
                        <source src={video_1} type="video/mp4"/>
                    </video>
                </div>
                <div>
                    <Container id="popUp" style={{position:"absolute"}}>
                    <Row>
                        <Col xs={3} md={3} lg={3}>
                            <i class="fas fa-birthday-cake carouselIcon"></i>
                        </Col>
                        
                        <Col xs={9} md={8} lg={8} id="carouselFollow">
                            <p style={{paddingLeft:"20px"}}>Follow,<br/> us to make your <br/>dream cake a  Real..!</p>
                        </Col>
                    </Row>
                </Container >
                </div>
                {/* Follow us to show our talent to the world while making your desired cake real. */}
                <div className="home-cake-structure">
                    <div className="text-center">
                        <h1 id="home-cake-header" className="text-center">Cake Mount</h1>
                        <div className="text-center">
                            <i className="fas fa-birthday-cake fa-5x" id="home-cake-icon"></i>
                        </div>
                        <div className="text-center">
                            <Link to='/categories'> <button className="btn home-cake-btn" id="home-cake-designs" type="button" >Categories</button></Link>
                        </div>
                        <div className="text-center">

                            {type == 'cakemaker'? <Link to={`/profiles/cakemaker/${cake_makers_id}`}><button className="btn home-cake-btn" id="home-cake-profiles" type="button" >Profiles</button></Link> : <Link to={`/profiles/allcakemakers`}><button className="btn home-cake-btn" id="home-cake-profiles" type="button" >Cakemakers</button></Link>}
                            
                        </div>
                        <div className="text-center">
                            <div className="btn" id="home-cake-bottom"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Home