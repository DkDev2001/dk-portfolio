import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ChatText } from "react-bootstrap-icons";
import bannerlottie from '../assets/img/bannerlottie.json'
import lottie from 'lottie-web';
import { Reveal } from "./Reveal";
import { useFetch } from "../hooks/useFetch";
import { getContact, getTitles } from "../services/api";
import { pickPrimary } from "../utils/contact";

const DEFAULT_TITLES = ['Mobile App Developer', 'Web Developer'];
const PERIOD = 2000;

export const Banner = ({ settings = {} }) => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [text, setText] = useState('');
    const [delta, setDelta] = useState(300 - Math.random() * 100);

    const { data: titlesData } = useFetch(getTitles, []);
    const toRotate = (titlesData && titlesData.length)
        ? titlesData.map((t) => t.text)
        : DEFAULT_TITLES;

    const { data: links } = useFetch(getContact, []);
    const primary = pickPrimary(links, settings);

    useEffect(() => {
        const ticker = setInterval(() => { tick(); }, delta);
        return () => clearInterval(ticker);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);

    const tick = () => {
        const i = loopNum % toRotate.length;
        const fullText = toRotate[i];
        const updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta((prev) => prev / 2);
        }

        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(PERIOD);
        } else if (isDeleting && updatedText === '') {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(500);
        } else {
            setDelta(120);
        }
    };

    const container = useRef(null);

    useEffect(() => {
        const instance = lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: bannerlottie
        });
        return () => instance.destroy();
    }, []);

    return (
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7}>
                        <Reveal animation="fadeInTopLeft">
                            <span className="tagline">Hello👋</span>
                            <h1>
                                {'I\'m DK, '}
                                <span className="wrap">{text}</span>
                            </h1>
                            <p>Have a Software Proposal?</p>
                            {primary && (
                                <a target="_blank" rel="noreferrer" href={primary.url}>
                                    <button>Let’s Discuss With Deepak<ChatText size={25} /></button>
                                </a>
                            )}
                        </Reveal>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <Reveal animation="zoomIn">
                            <div className="container" ref={container}></div>
                        </Reveal>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
