import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ChatText } from "react-bootstrap-icons";
import bannerlottie from '../assets/img/bannerlottie.json'
import harru from '../assets/img/harru.svg';
import lottie from 'lottie-web';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ['Mobile App Developer', 'Web Developer'];
    const [text, setText] = useState(0);
    const [delta, setDelta] = useState(300 - Math.random * 100);
    const [index, setIndex] = useState(1);
    const period = 1000;

    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
        }, [text])
    
    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setIndex(prevIndex => prevIndex - 1);
            setDelta(period);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setIndex(1);
            setDelta(500);
        } else {
            setIndex(prevIndex => prevIndex + 1);
        }
    }
    
    const container = useRef(null);

    useEffect(() => {
        const instance = lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: bannerlottie
        })

        // Return clean up function here
        return () => instance.destroy();
    }, [])

    return(
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                    <TrackVisibility>
                        {({ isVisible }) =>
                        <div className={isVisible ? "animate__animated animate__fadeInTopLeft" : ""}>
                            <span className="tagline">Hello👋</span>
                            <h1>
                                {'I\'m DK'}<img src={harru} />{', '}
                                <span className="wrap">{ text}</span>
                            </h1>
                            <p>Have a Software Proposal?</p>
                            <a target="_blank" href="https://wa.me/919360603898?text=I've%20a%20software%20proposal"><button>Let’s Discuss With Deepak<ChatText size={25} /></button></a>
                        </div>}
                    </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility>
                        {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                                    <div className="container" ref={container}></div>
                            </div>}
                        </TrackVisibility>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}


