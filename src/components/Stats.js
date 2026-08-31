import { Container, Row, Col } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { getStats } from "../services/api";
import { StatCounter } from "./StatCounter";

export const Stats = () => {
    const { data: stats } = useFetch(getStats, []);
    if (!stats || !stats.length) return null;

    return (
        <section className="stats-section" id="stats">
            <Container>
                <div className="stats-glass">
                    <Row className="justify-content-center align-items-center g-0">
                        {stats.map((s) => (
                            <Col xs={6} md={3} key={s.id}>
                                <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>
        </section>
    );
};
