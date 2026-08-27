import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { getProjects } from "../services/api";
import { SkeletonCards } from "./Skeleton";
import { ProjectCard } from "./ProjectCard";

const FILTERS = [
    { key: "all", label: "All" },
    { key: "android", label: "Android" },
    { key: "ios", label: "iOS" },
    { key: "web", label: "Web" },
];

export const ProjectsPage = () => {
    const { data: projects, loading } = useFetch(getProjects, []);
    const [filter, setFilter] = useState("all");
    const [q, setQ] = useState("");

    let list = projects || [];
    if (filter !== "all") list = list.filter((p) => (p.platforms || "").toLowerCase().includes(filter));
    if (q) list = list.filter((p) => (p.title + " " + (p.description || "")).toLowerCase().includes(q.toLowerCase()));

    return (
        <section className="project projects-page" id="projects">
            <Container>
                <Row>
                    <Col>
                        <h2>All Projects💻</h2>
                        <p className="section-sub">{(projects || []).length}+ apps and web products delivered</p>

                        <div className="proj-filter-bar">
                            <div className="proj-filters">
                                {FILTERS.map((f) => (
                                    <button
                                        key={f.key}
                                        className={`proj-filter ${filter === f.key ? "active" : ""}`}
                                        onClick={() => setFilter(f.key)}
                                    >
                                        {f.label}
                                    </button>
                                ))}
                            </div>
                            <input
                                className="proj-search"
                                placeholder="Search projects..."
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </div>

                        {loading ? (
                            <SkeletonCards count={9} />
                        ) : list.length ? (
                            <Row>
                                {list.map((p) => (
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
                        ) : (
                            <p className="text-center" style={{ opacity: 0.7, padding: "40px 0" }}>No projects match.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProjectsPage;
