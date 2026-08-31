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

    // Home section lists projects marked "show on home", newest first.
    const byNewest = (a, b) => (b.completed_at || "").localeCompare(a.completed_at || "");
    const all = (projects || []).filter((p) => p.visible != 0);
    const home = all.filter((p) => p.show_on_home == 1).slice().sort(byNewest);
    // fallback: newest 6 if nothing is flagged for home
    const shown = (home.length ? home : all.slice().sort(byNewest)).slice(0, 6);

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
                                            shortDescription={p.short_description}
                                            image={p.image}
                                            platforms={p.platforms}
                                            frameType={p.frame_type}
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
