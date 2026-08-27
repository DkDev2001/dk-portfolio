import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Android2, Apple, Globe2 } from "react-bootstrap-icons";
import { PhoneFrame } from "./PhoneFrame";

const PLATFORM_META = {
    android: { label: "Android", Icon: Android2, cls: "badge-android" },
    ios: { label: "iOS", Icon: Apple, cls: "badge-ios" },
    web: { label: "Web", Icon: Globe2, cls: "badge-web" },
};

const PlatformBadges = ({ platforms }) => {
    const list = (platforms || "")
        .split(",")
        .map((p) => p.trim().toLowerCase())
        .filter((p) => PLATFORM_META[p]);
    if (!list.length) return null;
    return (
        <div className="proj-badges">
            {list.map((p) => {
                const { label, Icon, cls } = PLATFORM_META[p];
                return (
                    <span className={`proj-badge ${cls}`} key={p} title={label} aria-label={label}>
                        <Icon size={20} />
                    </span>
                );
            })}
        </div>
    );
};

export const ProjectCard = ({ id, title, description, image, platforms, to }) => {
    const inner = (
        <div className="proj-imgbx">
            <PlatformBadges platforms={platforms} />
            <PhoneFrame src={image} alt={title} />
            <h5>{title}</h5>
            <div className="proj-txtx">
                <span>{description}</span>
            </div>
        </div>
    );
    return (
        <Col sm={6} md={4}>
            {to ? <Link to={to} className="proj-link">{inner}</Link> : inner}
        </Col>
    );
};
