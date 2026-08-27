import { Navigate } from "react-router-dom";
import { About } from "./About";

const isOn = (settings, key) => {
    const v = settings ? settings[key] : undefined;
    if (v === undefined || v === null) return true;
    return v === "1" || v === 1 || v === true;
};

// Standalone /about route. Hidden (redirects home) when About is toggled off.
export const AboutPage = ({ settings = {} }) => {
    if (!isOn(settings, "about_visible")) return <Navigate to="/" replace />;
    return (
        <div className="subpage">
            <About />
        </div>
    );
};

export default AboutPage;
