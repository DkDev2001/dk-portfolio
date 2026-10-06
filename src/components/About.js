import { Container, Row, Col } from "react-bootstrap";
import { Download, GeoAlt } from "react-bootstrap-icons";
import { useFetch } from "../hooks/useFetch";
import { getAbout } from "../services/api";
import { Reveal } from "./Reveal";
import { IdCard } from "./IdCard";

const isOn = (settings, key) => {
    const v = settings ? settings[key] : undefined;
    if (v === undefined || v === null) return true;
    return v === "1" || v === 1 || v === true;
};

export const About = ({ settings = {} }) => {
    const { data: about } = useFetch(getAbout, {});
    if (!about || (!about.bio && !about.name)) return null;
    const showCard = about.photo && isOn(settings, "idcard_visible");

    return (
        <section className="about" id="about">
            <Container>
                <Row className="align-items-center">
                    {showCard && (
                        <Col xs={12} md={5} className="about-card-col">
                            <IdCard about={about} />
                        </Col>
                    )}
                    {about.photo && !showCard && (
                        <Col xs={12} md={4} className="about-photo-col">
                            <Reveal animation="zoomIn">
                                <div className="about-photo-wrap">
                                    <img src={about.photo} alt={about.name} loading="lazy" />
                                    {about.available == 1 && <span className="about-status"><span className="dot" /> Available for work</span>}
                                </div>
                            </Reveal>
                        </Col>
                    )}
                    <Col xs={12} md={showCard ? 7 : about.photo ? 8 : 12}>
                        <Reveal animation="fadeInUp">
                            <span className="about-tag">About Me</span>
                            <h2>{about.name}</h2>
                            {about.headline && <h4 className="about-headline">{about.headline}</h4>}
                            {about.location && <p className="about-loc"><GeoAlt /> {about.location}</p>}
                            <div className="about-bio">
                                {String(about.bio || "").split(/\n\s*\n/).filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
                            </div>
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
