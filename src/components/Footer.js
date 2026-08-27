import { Container, Row, Col } from "react-bootstrap";
import { Whatsapp, Github, Twitter, Facebook, Youtube, BriefcaseFill, Link45deg } from "react-bootstrap-icons";
import { useFetch } from "../hooks/useFetch";
import { getContact } from "../services/api";
import { pickPrimary } from "../utils/contact";
import { Reveal } from "./Reveal";
import { FooterWave } from "./FooterWave";
import linkedin from '../assets/img/linkedin.svg';
import slack from '../assets/img/slack.svg';
import gmail from '../assets/img/gmail.svg';
import instagram from '../assets/img/instagram.svg';

// Original colored brand SVGs where available.
const SVG_ICONS = { linkedin, slack, email: gmail, gmail, instagram };
// Fallback: bootstrap glyphs tinted with each brand's colour.
const RB_ICONS = {
    whatsapp: { Icon: Whatsapp, color: "#25D366" },
    fiverr: { Icon: BriefcaseFill, color: "#1DBF73" },
    github: { Icon: Github, color: "#ffffff" },
    twitter: { Icon: Twitter, color: "#1DA1F2" },
    facebook: { Icon: Facebook, color: "#1877F2" },
    youtube: { Icon: Youtube, color: "#FF0000" },
};

const SocialIcon = ({ platform }) => {
    if (SVG_ICONS[platform]) return <img src={SVG_ICONS[platform]} alt={platform} />;
    const rb = RB_ICONS[platform];
    const Icon = rb ? rb.Icon : Link45deg;
    return <Icon style={{ color: rb ? rb.color : "#ffffff" }} />;
};

export const Footer = ({ settings = {} }) => {
    const { data: links } = useFetch(getContact, []);
    const active = (links || []).filter((l) => l.is_active && l.url);

    // Primary CTA target comes from Settings (primary_contact).
    const primary = pickPrimary(links, settings);

    return (
        <section className="footer" id="footer">
            <FooterWave />
            <div className="footer-bx">
                <Container>
                    <Reveal animation="zoomIn">
                        <Row className="align-items-center">
                            <Col xs={12} md={5} xl={6}>
                                <h1>Get In Touch</h1>
                                <p>Want to get in touch? I'd love to hear from you. Here's how you can reach me...</p>
                            </Col>
                            <Col className="footer-icons">
                                {primary && (
                                    <a target="_blank" rel="noreferrer" href={primary.url}>
                                        <button className="vvd"><span>{primary.label || "Let’s Connect"}</span></button>
                                    </a>
                                )}
                                {active.length > 0 && (
                                    <div className="social-icon">
                                        {active.map((l) => (
                                            <a key={l.id} target="_blank" rel="noreferrer" href={l.url} title={l.label || l.platform}>
                                                <SocialIcon platform={l.platform} />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Reveal>
                </Container>
                <footer className="copyright">
                    <p>&copy; 2026 All Rights Reserved</p>
                </footer>
            </div>
        </section>
    );
};
