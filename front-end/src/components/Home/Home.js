import React,{Fragment} from "react";
import {Link} from 'react-router-dom';
import video_1 from './../../videos/video_1.mp4';
import './../../css/home.css';
import {Button,Carousel, Container, Row, Col,Jumbotron,Card} from 'react-bootstrap';

const Home = () => {
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
                        <Col xs={3} md={6} lg={4}>
                            <i  class="fas fa-birthday-cake fa-2x carouselIcon" ></i>
                        </Col>
                        
                        <Col xs={9} md={6} lg={8} id="carouselFollow">
                            <p>Follow<br/> to get the latest recipes,<br/> articles and more!</p>
                        </Col>
                    </Row>
                </Container >
                </div>
                
                <div className="home-cake-structure">
                    <div className="text-center">
                        <h1 id="home-cake-header">Black Mount</h1>
                        <div className="text-center">
                            <i class="fas fa-birthday-cake fa-5x" id="home-cake-icon"></i>
                        </div>
                        <div className="text-center">
                            <Link to='/categories'> <button className="btn home-cake-btn" id="home-cake-designs" type="button" >Categories</button></Link>
                        </div>
                        <div className="text-center">
                            <button className="btn home-cake-btn" id="home-cake-profiles" type="button" >Profiles</button>
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