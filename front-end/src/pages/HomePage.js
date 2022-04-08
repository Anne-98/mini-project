import React, { Fragment, useEffect } from "react";
import {Routes } from "react-router-dom";
import Design from "../components/Home/Design";
import Home from "../components/Home/Home";
import { Container, Row, Col } from "react-bootstrap"; 
import DisplayPost from "../components/Post/DisplayPosts";
import Poster from "../components/Home/Poster";
import Footer from "../components/Home/Footer";

const HomePage = () => {


    return(
                <div fluid="md">
                    <Row>
                        <Col><Home/></Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        <Col><Design/></Col>
                    </Row>
                    <Row>
                        <Col><DisplayPost /></Col>
                    </Row>
                    <Row>
                        <Col><Poster /></Col>
                    </Row>
                    <Row>
                        <Col><Footer /></Col>
                    </Row>
                </div>
                    
    )
}

export default HomePage