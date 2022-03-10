import {Component} from 'react';
import {Link} from 'react-router-dom';
import {Container, Table, Row, Col} from 'react-bootstrap';
import './../../css/Home/Footer.css';

const Footer = () => {

    const refreshPage = () => {
        // window.location.reload(true)
        window.scrollTo(0, 0)
    }
    return(
        <Container fluid className="footer-div">
                <Row className="footer-row">
                    <Col sm="12" md="4" className="footer-div-1">
                        <p>All Rights Reserved</p>
                        <p>&copy; Copyright</p>
                    </Col>
                    <Col sm="12" md="4" className="footer-div-2">
                        <h1 className="footer-headings">Links</h1>
                        <div onClick={refreshPage}><Link to="/" className="footer-links"><p>Home</p></Link></div>
                        <p onClick={refreshPage}><Link to="/" className="footer-links">Try It</Link></p>
                        <p onClick={refreshPage}><Link to="/" className="footer-links">Categories</Link></p>
                    </Col>
                    <Col sm="12" md="4" className="footer-div-3">
                        <h1 className="footer-headings">Connect</h1>
                        <p>Follow Us</p>
                        <p className="footer-links"><a href="https://www.facebook.com/"><i class="fab fa-facebook footer-icon"></i></a></p>
                        <p className="footer-links"><a href="https://twitter.com/"><i class="fab fa-twitter footer-icon"></i></a></p>
                        <p className="footer-links"><a href="https://webmail.au.syrahost.com/"><i class="fas fa-envelope-square footer-icon"></i></a></p>
                    </Col>
                </Row>
            </Container>
    )
}

export default Footer