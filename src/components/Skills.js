import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useFetch } from "../hooks/useFetch";
import { getSkills } from "../services/api";
import { Reveal } from "./Reveal";
import { Loader } from "./Loader";
import { GradientGauge } from "./GradientGauge";

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

// Render a category's skills as a responsive grid of icon tiles.
const TechGrid = ({ items }) => (
    <Row>
        {items.map((s) => (
            <Col xs={6} md={3} key={s.id}>
                <div className="tech-item">
                    <img src={s.image} alt={s.title} />
                    <h5>{s.title}</h5>
                </div>
            </Col>
        ))}
    </Row>
);

const isOn = (settings, key) => {
    const v = settings ? settings[key] : undefined;
    if (v === undefined || v === null) return true;
    return v === "1" || v === 1 || v === true;
};

export const Skills = ({ settings = {} }) => {
    const { data: skillsData, loading } = useFetch(getSkills, { categories: [] });

    const categories = (skillsData && skillsData.categories) || [];
    const experience = categories.find((c) => c.name === "Experience");
    const otherCategories = categories.filter((c) => {
        if (c.name === "Experience") return false;
        if (c.name === "Tech Stack") return isOn(settings, "tech_visible");
        if (c.name === "Tools") return isOn(settings, "tools_visible");
        return true;
    });

    return (
        <section className="skill" id="skills">
            <Container>
                <Row>
                    <Col>
                        <div className="skill-bx">
                            <h2>Skills🚀</h2>
                            {isOn(settings, "skills_visible") && <p>My Emergive Skills</p>}

                            {loading ? (
                                <div className="section-loader"><Loader size={72} /></div>
                            ) : (
                                <>
                                    {/* Emergive Skills — carousel */}
                                    {isOn(settings, "skills_visible") && experience && experience.items.length > 0 && (
                                        <Reveal animation="fadeInLeftBig">
                                            <Carousel responsive={responsive} infinite={true} className="skill-slider">
                                                {experience.items.map((s) => (
                                                    <div className="item gauge-item" key={s.id}>
                                                        <GradientGauge percent={s.percent} />
                                                        <h5>{s.title}</h5>
                                                    </div>
                                                ))}
                                            </Carousel>
                                        </Reveal>
                                    )}

                                    {/* Tech Stack + Tools — dynamic grids */}
                                    <div className="skill-sub-bx">
                                        {otherCategories.map((cat, i) => (
                                            <div key={cat.id}>
                                                <p>{cat.name === "Tech Stack" ? "My Tech Stack" : cat.name === "Tools" ? "Tools I'm Using" : cat.name}</p>
                                                <Reveal animation="fadeInLeftBig" delay={i * 120}>
                                                    <TechGrid items={cat.items} />
                                                </Reveal>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
