import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { getProjects } from "../services/api";
import { SkeletonCards } from "./Skeleton";
import { ProjectCard } from "./ProjectCard";

const PAGE = 25;

const isOn = (settings, key) => {
    const v = settings ? settings[key] : undefined;
    if (v === undefined || v === null) return true;
    return v === "1" || v === 1 || v === true;
};

const FILTERS = [
    { key: "all", label: "All" },
    { key: "android", label: "Android" },
    { key: "ios", label: "iOS" },
    { key: "web", label: "Web" },
];

export const ProjectsPage = ({ settings = {} }) => {
    const { data: projects, loading } = useFetch(getProjects, []);
    const [filter, setFilter] = useState("all");
    const [q, setQ] = useState("");
    const [limit, setLimit] = useState(PAGE);

    // Reset the visible count when the filter or search changes.
    useEffect(() => { setLimit(PAGE); }, [filter, q]);

    // Newest completed first (null dates last).
    const byNewest = (a, b) => (b.completed_at || "").localeCompare(a.completed_at || "");
    const visibleAll = (projects || []).filter((p) => p.visible != 0).slice().sort(byNewest);
    let list = visibleAll;
    if (filter !== "all") list = list.filter((p) => (p.platforms || "").toLowerCase().includes(filter));
    if (q) list = list.filter((p) => (p.title + " " + (p.description || "")).toLowerCase().includes(q.toLowerCase()));

    return (
        <section className="project projects-page" id="projects">
            <Container>
                <Row>
                    <Col>
                        <h2>All Projects💻</h2>
                        {isOn(settings, "projects_desc_visible") && (
                            <p className="section-sub">{settings.projects_desc || `${visibleAll.length}+ apps and web products delivered`}</p>
                        )}

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
                            <>
                                <Row>
                                    {list.slice(0, limit).map((p) => (
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
                                {list.length > limit && (
                                    <div className="text-center">
                                        <button className="view-all-btn" onClick={() => setLimit((n) => n + PAGE)}>
                                            Load more
                                        </button>
                                    </div>
                                )}
                            </>
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
