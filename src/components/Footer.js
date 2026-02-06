import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import linkedin from '../assets/img/linkedin.svg';
import slack from '../assets/img/slack.svg';
import gmail from '../assets/img/gmail.svg';
import instagram from '../assets/img/instagram.svg';

export const Footer = () => {
    return(
        <section className="footer" id="footer">
            <div className="ocean">
                <div className="wave wave1" />
                <div className="wave wave2" />
                <div className="wave wave3" />
                <div className="wave wave4" />
            </div>
            <div className="footer-bx">
                <Container>
                    <TrackVisibility>
                    {({ isVisible }) =>
                        <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                            <Row className="align-items-center">
                                <Col xs={12} md={6} xl={7}>
                                    <h1>Get In Touch</h1>
                                    <p>Want to get in touch? I'd love to hear from you. Here's how you can reach me...</p>
                                </Col>
                                <Col className="footer-icons">
                                    <a target="_blank" href="https://www.fiverr.com/s/zWavKro"><button className="vvd"><span>Let’s Connect</span></button></a>
                                    {/* <a target="_blank" href="https://wa.me/919360603898?text=I've%20a%20software%20proposal"><button className="vvd"><span>Let’s Connect</span></button></a>
                                    <div className="social-icon">
                                        <a target="_blank" href="https://www.linkedin.com/in/deepak-kumar-r-179714219"><img src={linkedin} alt="linkedin" /></a>
                                        <a target="_blank" href="https://dk-o9a8130.slack.com/"><img src={slack} alt="slack" /></a>
                                        <a target="_blank" href="mailto:dkdeepaknov@gmail.com"><img src={gmail} alt="gmail" /></a>
                                        <a target="_blank" href="https://www.instagram.com/d_k_dev_?igsh=MTZ5M290bG91cHY5aA=="><img src={instagram} alt="instagram" /></a>
                                    </div> */}
                                </Col>
                            </Row>
                        </div>}
                    </TrackVisibility>
                    
                </Container>
                <footer className="copyright">
                    <p>&copy; 2026 All Rights Reserved</p>
                </footer>
            </div>
        </section>
    )
}