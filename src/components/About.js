import { Container, Row, Col } from "react-bootstrap";
import { Download, GeoAlt } from "react-bootstrap-icons";
import { useFetch } from "../hooks/useFetch";
import { getAbout } from "../services/api";
import { Reveal } from "./Reveal";

export const About = () => {
    const { data: about } = useFetch(getAbout, {});
    if (!about || (!about.bio && !about.name)) return null;

    return (
        <section className="about" id="about">
            <Container>
                <Row className="align-items-center">
                    {about.photo && (
                        <Col xs={12} md={4} className="about-photo-col">
                            <Reveal animation="zoomIn">
                                <div className="about-photo-wrap">
                                    <img src={about.photo} alt={about.name} loading="lazy" />
                                    {about.available == 1 && <span className="about-status"><span className="dot" /> Available for work</span>}
                                </div>
                            </Reveal>
                        </Col>
                    )}
                    <Col xs={12} md={about.photo ? 8 : 12}>
                        <Reveal animation="fadeInUp">
                            <span className="about-tag">About Me</span>
                            <h2>{about.name}</h2>
                            {about.headline && <h4 className="about-headline">{about.headline}</h4>}
                            {about.location && <p className="about-loc"><GeoAlt /> {about.location}</p>}
                            <p className="about-bio">{about.bio}</p>
                            {about.resume && (
                                <a href={about.resume} target="_blank" rel="noreferrer" className="about-resume">
                                    <button><Download size={18} /> Download Resume</button>
                                </a>
                            )}
                        </Reveal>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
