import React, { Fragment } from "react";
import {Routes } from "react-router-dom";
import Design from "../components/Home/Design";
import Home from "../components/Home/Home";
import { Container, Row, Col } from "react-bootstrap"; 

const HomePage = () => {
    return(
                <Container fluid="md">
                    <Row>
                        <Col><Home/></Col>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        <Col><Design/></Col>
                    </Row>
                </Container>
                    
    )
}

export default HomePage