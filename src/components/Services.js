import { Container, Row, Col } from "react-bootstrap";
import { Phone, Laptop, Palette, Grid3x3Gap, Robot } from "react-bootstrap-icons";
import { useFetch } from "../hooks/useFetch";
import { getServices } from "../services/api";
import { Reveal } from "./Reveal";

// Fallback icon per service title keyword (used when no icon image uploaded).
const fallbackIcon = (title = "") => {
    const t = title.toLowerCase();
    if (/\bai\b/.test(t) || t.startsWith("ai") || t.includes("agent")) return Robot;
    if (t.includes("android") || t.includes("app") || t.includes("flutter") || t.includes("mobile")) return Phone;
    if (t.includes("web")) return Laptop;
    if (t.includes("ui") || t.includes("design")) return Palette;
    return Grid3x3Gap;
};

export const Services = () => {
    const { data: servicesRaw } = useFetch(getServices, []);
    const services = (servicesRaw || []).filter((s) => s.visible != 0);
    if (!services.length) return null;

    return (
        <section className="services" id="services">
            <Container>
                <Row>
                    <Col>
                        <h2>Services💡</h2>
                        <p className="section-sub">What I can build for you</p>
                        <Row className="justify-content-center">
                            {services.map((s, i) => {
                                const Icon = fallbackIcon(s.title);
                                return (
                                    <Col xs={12} sm={6} lg={3} key={s.id}>
                                        <Reveal animation="fadeInUp" delay={i * 90}>
                                            <div className="service-card fx-card">
                                                <div className="service-icon">
                                                    {s.icon ? <img src={s.icon} alt={s.title} loading="lazy" /> : <Icon size={30} />}
                                                </div>
                                                <h5>{s.title}</h5>
                                                <p>{s.description}</p>
                                            </div>
                                        </Reveal>
                                    </Col>
                                );
                            })}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
