import { Row, Col, Container } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { getProjects } from "../services/api";
import { Loader } from "./Loader";
import { ProjectCard } from "./ProjectCard";

const isOn = (settings, key) => {
    const v = settings ? settings[key] : undefined;
    if (v === undefined || v === null) return true;
    return v === "1" || v === 1 || v === true;
};

const DEFAULT_DESC =
    "25+ completed projects and a spark of innovation. Explore my portfolio and ignite your next project with me.";

export const Projects = ({ settings = {} }) => {
    const { data: projects, loading } = useFetch(getProjects, []);

    const desc = settings.projects_desc || DEFAULT_DESC;
    const showDesc = isOn(settings, "projects_desc_visible");

    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col>
                        <h2>Projects💻</h2>
                        {showDesc && <p>{desc}</p>}
                        {loading ? (
                            <div className="section-loader"><Loader size={72} /></div>
                        ) : (
                            <Row>
                                {(projects || []).map((project, index) => (
                                    <ProjectCard
                                        key={project.id || index}
                                        title={project.title}
                                        description={project.description}
                                        image={project.image}
                                        platforms={project.platforms}
                                    />
                                ))}
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
