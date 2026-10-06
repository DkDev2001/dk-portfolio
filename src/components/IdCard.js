import { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Envelope, Linkedin, Whatsapp, Github, GeoAlt, Download, ArrowRepeat } from "react-bootstrap-icons";
import { useFetch } from "../hooks/useFetch";
import { getSkills, getContact } from "../services/api";
import logo from "../assets/img/logo.svg";

const PORTFOLIO_URL = "https://dk.venzpire.cloud/";
const BARCODE_SEED = "DK-2021";
const SINCE = "2021";
const FALLBACK_STACK = ["Kotlin", "Jetpack Compose", "Flutter", "Swift / iOS", "React", "PHP & MySQL", "LLM Agents", "Gemini AI"];

// Deterministic barcode bars from a seed string (same bars every render).
const Barcode = ({ seed }) => {
    const bars = useMemo(() => {
        let h = 0;
        for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
        const out = [];
        let x = 0;
        for (let i = 0; i < 42; i++) {
            h = (h * 1103515245 + 12345) >>> 0;
            const w = 1 + (h % 3);
            if (i % 2 === 0) out.push({ x, w });
            x += w;
        }
        return { out, total: x };
    }, [seed]);
    return (
        <svg className="idc-barcode" viewBox={`0 0 ${bars.total} 20`} preserveAspectRatio="none" aria-hidden="true">
            {bars.out.map((b, i) => <rect key={i} x={b.x} y="0" width={b.w} height="20" />)}
        </svg>
    );
};

const CONTACT_ICONS = { email: Envelope, linkedin: Linkedin, whatsapp: Whatsapp, github: Github };

// Hanging lanyard ID card: drops in, swings on a damped pendulum, can be dragged
// (desktop), tilts with the cursor, and flips on click/tap to show the back.
export const IdCard = ({ about }) => {
    const stageRef = useRef(null);
    const swingRef = useRef(null);
    const tiltRef = useRef(null);
    const [flipped, setFlipped] = useState(false);
    const [touch] = useState(() => typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches);

    const { data: skillsData } = useFetch(getSkills, { categories: [] });
    const { data: links } = useFetch(getContact, []);

    const stack = useMemo(() => {
        const exp = (skillsData?.categories || []).find((c) => c.name === "Experience");
        const titles = (exp?.items || []).filter((s) => s.visible != 0).map((s) => s.title);
        return titles.length ? titles : FALLBACK_STACK;
    }, [skillsData]);

    const reach = (links || []).filter((l) => l.is_active != 0 && l.url && CONTACT_ICONS[l.platform]);

    // ---- pendulum physics + drag + tilt ----
    useEffect(() => {
        const stage = stageRef.current, swing = swingRef.current, tilt = tiltRef.current;
        if (!stage || !swing || !tilt) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let theta = reduce ? 0 : 0.34;   // start tilted so it swings in as it drops
        let omega = 0;
        let raf = 0, last = performance.now(), running = false;
        let down = null, dragging = false, grabOffset = 0, prevTheta = 0, prevT = 0;
        const K = 26, C = 2.3;           // spring stiffness, damping

        const render = () => { swing.style.transform = `rotate(${theta}rad)`; };

        const step = (now) => {
            const dt = Math.min((now - last) / 1000, 0.032);
            last = now;
            if (!dragging) {
                const target = 0.022 * Math.sin(now / 1000 * 1.15); // gentle idle sway
                omega += (-K * (theta - target) - C * omega) * dt;
                theta += omega * dt;
            }
            render();
            raf = requestAnimationFrame(step);
        };
        const start = () => { if (running || reduce) return; running = true; last = performance.now(); raf = requestAnimationFrame(step); };
        const stop = () => { running = false; cancelAnimationFrame(raf); };

        render();
        // Only animate while the card is on screen and the tab is visible.
        const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop()), { threshold: 0.05 });
        io.observe(stage);
        const onVis = () => (document.hidden ? stop() : start());
        document.addEventListener("visibilitychange", onVis);

        const pivot = () => { const r = stage.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top }; };
        const angleAt = (x, y) => { const p = pivot(); return -Math.atan2(x - p.x, Math.max(y - p.y, 1)); };

        const setTilt = (rx, ry, mx, my) => {
            tilt.style.setProperty("--rx", `${rx}deg`);
            tilt.style.setProperty("--ry", `${ry}deg`);
            tilt.style.setProperty("--mx", `${mx}%`);
            tilt.style.setProperty("--my", `${my}%`);
        };

        // Ends any drag in progress. Called from every way a press can end —
        // including the ones where no pointerup ever arrives (released outside
        // the window, alt-tab, context menu, lost capture) — so the card can
        // never be left "held" at an angle.
        const endDrag = () => {
            if (dragging) { omega = Math.max(-9, Math.min(9, omega)); tilt.classList.remove("is-dragging"); }
            dragging = false; down = null;
        };

        const onDown = (e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;   // left button only (no right/middle-click grabs)
            down = { x: e.clientX, y: e.clientY, t: performance.now() };
            if (touch || reduce) return;
            grabOffset = theta - angleAt(e.clientX, e.clientY);
            prevTheta = theta; prevT = performance.now();
            tilt.setPointerCapture?.(e.pointerId);
        };
        const onMove = (e) => {
            // Button no longer held (release happened somewhere we never heard about) → let go.
            if (down && e.pointerType === "mouse" && (e.buttons & 1) === 0) endDrag();
            if (down && !touch && !reduce) {
                if (!dragging && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) {
                    dragging = true;
                    tilt.classList.add("is-dragging");
                    setTilt(0, 0, 50, 50);
                }
                if (dragging) {
                    const now = performance.now();
                    theta = Math.max(-1.1, Math.min(1.1, angleAt(e.clientX, e.clientY) + grabOffset));
                    const dt = Math.max((now - prevT) / 1000, 0.008);
                    omega = 0.6 * omega + 0.4 * ((theta - prevTheta) / dt);
                    prevTheta = theta; prevT = now;
                    if (!running) render();
                    return;
                }
            }
            if (!touch && !dragging) {
                const r = tilt.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
                setTilt((0.5 - py) * 14, (px - 0.5) * 16, px * 100, py * 100);
            }
        };
        const onUp = (e) => {
            if (!down) return;
            const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
            if (!dragging && moved < 6) setFlipped((f) => !f);
            endDrag();
        };
        const onCancel = () => endDrag();                     // pointercancel / lostpointercapture / window blur
        const onDragStart = (e) => e.preventDefault();        // no native image drag hijacking the card
        const onLeave = () => { if (!dragging) setTilt(0, 0, 50, 50); };

        tilt.addEventListener("pointerdown", onDown);
        tilt.addEventListener("pointermove", onMove);
        tilt.addEventListener("pointerup", onUp);
        tilt.addEventListener("pointercancel", onCancel);
        tilt.addEventListener("lostpointercapture", onCancel);
        tilt.addEventListener("pointerleave", onLeave);
        tilt.addEventListener("dragstart", onDragStart);
        tilt.addEventListener("contextmenu", onCancel);
        window.addEventListener("blur", onCancel);
        return () => {
            stop(); io.disconnect();
            document.removeEventListener("visibilitychange", onVis);
            tilt.removeEventListener("pointerdown", onDown);
            tilt.removeEventListener("pointermove", onMove);
            tilt.removeEventListener("pointerup", onUp);
            tilt.removeEventListener("pointercancel", onCancel);
            tilt.removeEventListener("lostpointercapture", onCancel);
            tilt.removeEventListener("pointerleave", onLeave);
            tilt.removeEventListener("dragstart", onDragStart);
            tilt.removeEventListener("contextmenu", onCancel);
            window.removeEventListener("blur", onCancel);
        };
    }, [touch]);

    const onKey = (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped((f) => !f); }
    };

    return (
        <div className="idc-stage" ref={stageRef}>
            <div className="idc-scale">
                <div className="idc-drop">
                    <div className="idc-swing" ref={swingRef}>
                        <div className="idc-strap"><span>DK · VENZPIRE · DEVELOPER · DK · VENZPIRE · DEVELOPER ·</span></div>
                        <div className="idc-clip"><span className="idc-ring" /></div>
                        <div
                            className="idc-tilt"
                            ref={tiltRef}
                            role="button"
                            tabIndex={0}
                            aria-label={flipped ? "ID card back — press to flip to front" : "ID card — press to flip"}
                            aria-pressed={flipped}
                            onKeyDown={onKey}
                        >
                            <div className={`idc-card${flipped ? " flipped" : ""}`}>
                                {/* ---------- FRONT ---------- */}
                                <div className="idc-face idc-front">
                                    <div className="idc-band">
                                        <span className="idc-slot" />
                                        <img src={logo} alt="DK" className="idc-logo" draggable="false" />
                                        <span className="idc-band-label">DEVELOPER ID</span>
                                    </div>
                                    <img src={about.photo} alt={about.name} className="idc-photo" draggable="false" />
                                    <div className="idc-body">
                                        <div className="idc-name">{about.name}</div>
                                        {about.headline && <div className="idc-role">{about.headline}</div>}
                                        <div className="idc-info">
                                            <div><span>Since</span><b>{SINCE}</b></div>
                                            <div><span>Base</span><b>{(about.location || "India").split(",")[0]}</b></div>
                                        </div>
                                        <div className="idc-foot">
                                            <div className="idc-qr">
                                                <QRCodeSVG value={PORTFOLIO_URL} size={64} fgColor="#1b1340" bgColor="#ffffff" level="M" />
                                            </div>
                                            <div className="idc-foot-r">
                                                {about.available == 1 && <span className="idc-status"><i /> Available for work</span>}
                                                <Barcode seed={BARCODE_SEED + about.name} />
                                                <span className="idc-scan">Scan to view portfolio</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ---------- BACK ---------- */}
                                <div className="idc-face idc-back">
                                    <span className="idc-slot" />
                                    <div className="idc-back-head">
                                        <img src={logo} alt="DK" className="idc-logo" draggable="false" />
                                        <span>{about.name}</span>
                                    </div>
                                    <h6>Core Stack</h6>
                                    <div className="idc-chips">
                                        {stack.slice(0, 8).map((s) => <span key={s}>{s}</span>)}
                                    </div>
                                    <h6>Reach Me</h6>
                                    <ul className="idc-reach">
                                        {reach.slice(0, 4).map((l) => {
                                            const Icon = CONTACT_ICONS[l.platform];
                                            return (
                                                <li key={l.id}>
                                                    <a href={l.url} target="_blank" rel="noreferrer" onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()}>
                                                        <Icon /> {l.platform === "whatsapp" ? "WhatsApp" : l.label || l.platform}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                        {about.location && <li className="plain"><GeoAlt /> {about.location}</li>}
                                    </ul>
                                    <div className="idc-back-qr">
                                        <div className="idc-qr"><QRCodeSVG value={PORTFOLIO_URL} size={52} fgColor="#1b1340" bgColor="#ffffff" level="M" /></div>
                                        <div><b>dk.venzpire.cloud</b><span>60+ apps · scan for my full portfolio</span></div>
                                    </div>
                                    {about.resume && (
                                        <a className="idc-resume" href={about.resume} target="_blank" rel="noreferrer" onPointerDown={(e) => e.stopPropagation()} onPointerUp={(e) => e.stopPropagation()}>
                                            <Download /> Download Resume
                                        </a>
                                    )}
                                    <span className="idc-flip-hint"><ArrowRepeat /> {touch ? "Tap" : "Click"} to flip back</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="idc-hint">{touch ? "Tap the card to flip" : "Drag me · Click to flip"}</div>
        </div>
    );
};

export default IdCard;
