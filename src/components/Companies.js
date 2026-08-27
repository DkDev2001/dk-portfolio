import { Row, Col, Container } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { getCompanies } from "../services/api";
import { Reveal } from "./Reveal";

// "Contribution With" box — its own section so it can be shown/hidden
// independently of the Projects section.
export const Companies = () => {
    const { data: companies } = useFetch(getCompanies, []);
    const active = (companies || []).filter((c) => c.is_active);
    if (!active.length) return null;

    return (
        <section className="project company-section">
            <Container>
                <Row>
                    <Col>
                        <div className="projects-sub-bx">
                            <h2>Contribution With🔥</h2>
                            <Reveal animation="zoomIn">
                                <Row className="justify-content-center">
                                    {active.map((c) => (
                                        <Col xs={12} sm={8} md={6} lg={5} key={c.id}>
                                            <div className="contri-bx">
                                                <img src={c.logo} alt={c.name} />
                                                <h5>{c.role || c.name}</h5>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </Reveal>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
