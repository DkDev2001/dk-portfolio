import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { GooglePlay, Apple, Globe2, ArrowLeft, Android2 } from "react-bootstrap-icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { useFetch } from "../hooks/useFetch";
import { getProject } from "../services/api";
import { PhoneFrame } from "./PhoneFrame";
import { Reveal } from "./Reveal";
import { PageSkeleton } from "./Skeleton";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const fmtMonth = (d) => { if (!d) return ""; const p = String(d).slice(0, 7).split("-"); return p.length === 2 ? `${MONTHS[+p[1] - 1]} ${p[0]}` : ""; };

const PLATFORM_META = {
    android: { label: "Android", Icon: Android2, cls: "badge-android" },
    ios: { label: "iOS", Icon: Apple, cls: "badge-ios" },
    web: { label: "Web", Icon: Globe2, cls: "badge-web" },
};

export const ProjectDetail = () => {
    const { id } = useParams();
    const { data: project, loading } = useFetch(() => getProject(id), null);

    if (loading) return <PageSkeleton />;
    if (!project || !project.id) {
        return (
            <div className="page-skeleton" style={{ textAlign: "center" }}>
                <h2>Project not found</h2>
                <Link to="/projects" className="view-all-btn">Back to projects</Link>
            </div>
        );
    }

    const platforms = (project.platforms || "").split(",").map((p) => p.trim().toLowerCase()).filter((p) => PLATFORM_META[p]);
    const tech = (project.tech || "").split(",").map((t) => t.trim()).filter(Boolean);
    const links = [
        { url: project.playstore_url, label: "Play Store", Icon: GooglePlay, cls: "link-play" },
        { url: project.appstore_url, label: "App Store", Icon: Apple, cls: "link-apple" },
        { url: project.web_url, label: "Live Demo", Icon: Globe2, cls: "link-web" },
    ].filter((l) => l.url);

    return (
        <section className="project-detail">
            <Container>
                <Link to="/projects" className="detail-back"><ArrowLeft /> All projects</Link>
                <Row className="align-items-start">
                    <Col xs={12} md={5} className="detail-phone">
                        <div className="detail-phone__sticky">
                            {project.frame_type === "web" ? (
                                <Reveal animation="zoomIn">
                                    <PhoneFrame src={project.image} alt={project.title} type="web" />
                                </Reveal>
                            ) : (
                                <PhoneFrame src={project.image} alt={project.title} type={project.frame_type} />
                            )}
                        </div>
                    </Col>
                    <Col xs={12} md={7} className="detail-info">
                        <div className="detail-badges">
                            {platforms.map((p) => {
                                const { label, Icon, cls } = PLATFORM_META[p];
                                return <span className={`detail-plat ${cls}`} key={p}><Icon size={16} /> {label}</span>;
                            })}
                        </div>
                        <h1>{project.title}</h1>
                        {project.completed_at && <p className="detail-date">Completed · {fmtMonth(project.completed_at)}</p>}
                        <div className="detail-desc">
                            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{project.description || ""}</ReactMarkdown>
                        </div>

                        {tech.length > 0 && (
                            <div className="detail-tech">
                                <h6>Tech used</h6>
                                <div>{tech.map((t) => <span className="tech-chip" key={t}>{t}</span>)}</div>
                            </div>
                        )}

                        {links.length > 0 ? (
                            <div className="detail-links">
                                {links.map((l) => (
                                    <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className={`detail-link ${l.cls}`}>
                                        <l.Icon size={20} /> {l.label}
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <p className="detail-nolinks">Live link available on request.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProjectDetail;
