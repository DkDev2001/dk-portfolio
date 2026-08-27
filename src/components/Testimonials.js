import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { StarFill, Star, PersonCircle } from "react-bootstrap-icons";
import { useFetch } from "../hooks/useFetch";
import { getTestimonials } from "../services/api";
import { Reveal } from "./Reveal";

const responsive = {
    desktop: { breakpoint: { max: 4000, min: 1024 }, items: 2 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const Stars = ({ n = 5 }) => (
    <span className="tst-stars">
        {Array.from({ length: 5 }).map((_, i) => (i < n ? <StarFill key={i} /> : <Star key={i} />))}
    </span>
);

export const Testimonials = () => {
    const { data: items } = useFetch(getTestimonials, []);
    if (!items || !items.length) return null;

    return (
        <section className="testimonials" id="testimonials">
            <Container>
                <Row>
                    <Col>
                        <h2>What Clients Say💬</h2>
                        <p className="section-sub">Feedback from people I've worked with</p>
                        <Reveal animation="fadeInUp">
                            <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={5000} className="tst-slider">
                                {items.map((t) => (
                                    <div className="tst-card" key={t.id}>
                                        <Stars n={t.rating} />
                                        <p className="tst-quote">“{t.quote}”</p>
                                        <div className="tst-author">
                                            {t.photo ? <img src={t.photo} alt={t.name} loading="lazy" /> : <PersonCircle size={44} />}
                                            <div>
                                                <h6>{t.name}</h6>
                                                <span>{[t.role, t.company].filter(Boolean).join(" · ")}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                        </Reveal>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
