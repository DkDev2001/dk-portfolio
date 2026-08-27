import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowRight } from "react-bootstrap-icons";
import { useFetch } from "../hooks/useFetch";
import { getProjects } from "../services/api";
import { SkeletonCards } from "./Skeleton";
import { ProjectCard } from "./ProjectCard";

const isOn = (settings, key) => {
    const v = settings ? settings[key] : undefined;
    if (v === undefined || v === null) return true;
    return v === "1" || v === 1 || v === true;
};
const DEFAULT_DESC =
    "25+ completed projects and a spark of innovation. Explore my portfolio and ignite your next project with me.";

export const FeaturedProjects = ({ settings = {} }) => {
    const { data: projects, loading } = useFetch(getProjects, []);
    const desc = settings.projects_desc || DEFAULT_DESC;
    const showDesc = isOn(settings, "projects_desc_visible");

    const all = projects || [];
    const featured = all.filter((p) => p.featured == 1);
    // fallback: first 6 by sort if nothing is flagged featured
    const shown = (featured.length ? featured : all).slice(0, 6);

    return (
        <section className="project" id="projects">
            <Container>
                <Row>
                    <Col>
                        <h2>Projects💻</h2>
                        {showDesc && <p>{desc}</p>}
                        {loading ? (
                            <SkeletonCards count={6} />
                        ) : (
                            <>
                                <Row>
                                    {shown.map((p) => (
                                        <ProjectCard
                                            key={p.id}
                                            title={p.title}
                                            description={p.description}
                                            image={p.image}
                                            platforms={p.platforms}
                                            to={`/projects/${p.id}`}
                                        />
                                    ))}
                                </Row>
                                {all.length > shown.length && (
                                    <div className="text-center">
                                        <Link to="/projects" className="view-all-btn">
                                            View all projects <ArrowRight />
                                        </Link>
                                    </div>
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
