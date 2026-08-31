import { Banner } from "./Banner";
import { Skills } from "./Skills";
import { Services } from "./Services";
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";
import { FeaturedProjects } from "./FeaturedProjects";
import { Companies } from "./Companies";

const isOn = (settings, key) => {
    const v = settings ? settings[key] : undefined;
    if (v === undefined || v === null) return true;
    return v === "1" || v === 1 || v === true;
};

export const Home = ({ settings = {} }) => (
    <>
        <Banner settings={settings} />
        {(isOn(settings, "skills_visible") || isOn(settings, "tech_visible") || isOn(settings, "tools_visible")) &&
            <Skills settings={settings} />}
        {isOn(settings, "services_visible") && <Services />}
        {isOn(settings, "stats_visible") && <Stats />}
        {isOn(settings, "projects_visible") && isOn(settings, "home_projects_visible") && <FeaturedProjects settings={settings} />}
        {isOn(settings, "testimonials_visible") && <Testimonials />}
        {isOn(settings, "company_visible") && <Companies />}
    </>
);

export default Home;
