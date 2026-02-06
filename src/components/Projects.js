import { Row, Col, Container } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import ibet from '../assets/img/ibet.svg'
import geofenatt from '../assets/img/geofenatt.svg'
import ams from '../assets/img/ams.svg'
import activityrecognition from '../assets/img/activityrecognition.svg'
import fiche from '../assets/img/fiche.svg'
import deva from '../assets/img/deva.svg'
import listbhejo from '../assets/img/listbhejo.svg'
import lotus from '../assets/img/lotus.svg'
import partyapp from '../assets/img/partyapp.svg'
import fluortronix from '../assets/img/fluortronix.svg'
import coorgcastle from '../assets/img/coorgcastle.svg'
import pickndrop from '../assets/img/pickndrop.svg'
import containmentzone from '../assets/img/containmentzone.svg'
import xincks from '../assets/img/xincks.svg'
import amazingbrowser from '../assets/img/amazingbrowser.svg'
import sos from '../assets/img/sos.svg'
import cricdream from '../assets/img/cricdream.svg'
import smsteels from '../assets/img/smsteels.svg'
import he5 from '../assets/img/he5.svg'
import wfgoalz from '../assets/img/wfgoalz.svg'
import tamilcollection from '../assets/img/tamilcollection.svg'
import fichelogo from '../assets/img/fichelogo.svg'
import venzpirelogo from '../assets/img/venzpirelogo.svg'
import harru from '../assets/img/harru.svg'
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {

    const projects = [
        {
          title: "Geofenatt",
          description: "College Attendance Maintanence App",
          image: geofenatt,
        },
        {
          title: "AMS",
          description: "Store Attendance Maintanence App",
          image: ams,
        },
        {
          title: "Activity Recognition",
          description: "User Activity Tracking App",
          image: activityrecognition,
        },
        {
          title: "Fiche",
          description: "Photoshoots Booking App",
          image: fiche,
        },
        {
          title: "Deva App",
          description: "Wallpaper Changer App",
          image: deva,
        },
        {
          title: "List Bhejo",
          description: "Grocery Management App",
          image: listbhejo,
        },
        {
          title: "Lotus VPN",
          description: "VPN App",
          image: lotus,
        },
        {
          title: "Party App",
          description: "Social Media App",
          image: partyapp,
        },
        {
          title: "Fluortronix Connect",
          description: "Wi-Fi Networks Manager App",
          image: fluortronix,
        },
        {
          title: "Coorg Castle",
          description: "Rooms Management App",
          image: coorgcastle,
        },
        {
          title: "PickNDrop",
          description: "Supply Chain Management App",
          image: pickndrop,
        },
        {
          title: "Containment Zone",
          description: "Containment Zone Tracer (Geofencing) App",
          image: containmentzone,
        },
        {
          title: "Xincks",
          description: "Lottery App",
          image: xincks,
        },
        {
          title: "Amazing Browser",
          description: "Browsing App With Video Downloader",
          image: amazingbrowser,
        },
        {
          title: "SOS App",
          description: "SOS Alert Manager App",
          image: sos,
        },
        {
          title: "Cric Dream",
          description: "IPL Score & News App",
          image: cricdream,
        },
        {
          title: "SM Steels",
          description: "Steel Goods Purchasing & Management App",
          image: smsteels,
        },
        {
          title: "He5 Web",
          description: "Web App For a Software Company",
          image: he5,
        },
        {
          title: "iBet",
          description: "Lottery App",
          image: ibet,
        },
        {
          title: "WF Goalz",
          description: "Insurance Policy App",
          image: wfgoalz,
        },
        {
          title: "Tamil Collection",
          description: "Dress Collection Shop Users App",
          image: tamilcollection,
        }
      ];
    
    return(
        <section className="project" id="projects">
            <Container>
            <Row>
                <Col>
                    <h2>Projects💻</h2>
                    <p>25+ completed projects and a spark of innovation. Explore my portfolio and ignite your next project with me. </p>
                    <Row>
                        {
                            projects.map((project, index) => {
                                return(
                                    <ProjectCard key={index} {...project} />
                                )
                            })
                        }
                    </Row>
                    <div className="projects-sub-bx">
                      <h2>Contribution With🔥</h2>
                      <TrackVisibility>
                        {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                              <Row>
                                <Col>
                                  <div className="contri-bx">
                                    <img src={venzpirelogo} alt="venzpire"/>
                                    <h5>Developer💻</h5>
                                  </div>
                                  <div className="contri-bx">
                                    <img src={fichelogo} alt="fiche"/>
                                    <h5>CTO🚀</h5>
                                  </div>
                                </Col>
                              </Row>
                            </div>}
                        </TrackVisibility>
                    </div>
                </Col>
            </Row>
            </Container>
        </section>
    )
}