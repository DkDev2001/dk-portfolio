import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import androidExperience from '../assets/img/androidexp.svg'
import flutterExperience from '../assets/img/flutterexp.svg'
import webExperience from '../assets/img/webexp.svg'
import uiExperience from '../assets/img/uiexp.svg'
import harru from '../assets/img/harru.svg'
import java from '../assets/img/Java.svg'
import kotlin from '../assets/img/Kotlin.svg'
import dart from '../assets/img/Dart.svg'
import html from '../assets/img/Html 5.svg'
import css from '../assets/img/CSS3.svg'
import php from '../assets/img/PHP Logo.svg'
import bootstrap from '../assets/img/Bootstrap.svg'
import js from '../assets/img/JavaScript.svg'
import react from '../assets/img/React.svg'
import sql from '../assets/img/MySQL Logo.svg'
import firebase from '../assets/img/Firebase.svg'
import jetpack from '../assets/img/jetpack.svg'
import androidstudio from '../assets/img/Androidstudio.svg'
import vscode from '../assets/img/VisualStudio.svg'
import flutterflow from '../assets/img/flutterflow.svg'
import postman from '../assets/img/Postman.svg'
import gitlab from '../assets/img/Gitlab.svg'
import sourcetree from '../assets/img/Sourcetree.svg'
import intelliJ from '../assets/img/IntelliJ.svg'
import figma from '../assets/img/Figma.svg'
import photoshop from '../assets/img/Photoshop.svg'
import phpstorm from '../assets/img/phpstorm.svg'
import jira from '../assets/img/jira.svg'
import github from '../assets/img/GitHub.svg'

export const Skills = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return(
        <section className="skill" id="skills">
            <Container>
                <Row>
                    <Col>
                    <div className="skill-bx">
                        <h2>Skills🚀</h2>
                        <p>My Emergive Skills</p>
                        <TrackVisibility>
                        {({ isVisible }) =>
                        <div className={isVisible ? "animate__animated animate__fadeInLeftBig" : ""}>
                            <Carousel responsive={responsive} infinite={true} className="skill-slider">
                                <div className="item">
                                    <img src={androidExperience} alt="androidExperience" />
                                    <h5>Android Development</h5>
                                </div>
                                <div className="item">
                                    <img src={flutterExperience} alt="flutterExperience" />
                                    <h5>Flutter Development</h5>
                                </div>
                                <div className="item">
                                    <img src={webExperience} alt="webExperience" />
                                    <h5>Web Development</h5>
                                </div>
                                <div className="item">
                                    <img src={uiExperience} alt="uiExperience" />
                                    <h5>UI/UX Design</h5>
                                </div>
                            </Carousel>
                        </div>}
                        </TrackVisibility>
                        <div className="skill-sub-bx">
                            <p>My Tech Stack</p>
                            <TrackVisibility>
                            {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__fadeInLeftBig" : ""}>
                                <Row>
                                    <Col>
                                        <div className="tech-item">
                                            <img src={java} alt="java" />
                                            <h5>Java</h5>
                                            <img src={kotlin} alt="kotlin" />
                                            <h5>Kotlin</h5>
                                            <img src={dart} alt="dart" />
                                            <h5>Dart</h5>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="tech-item">
                                            <img src={html} alt="html" />
                                            <h5>HTML 5</h5>
                                            <img src={css} alt="css" />
                                            <h5>CSS 3</h5>
                                            <img src={php} alt="php" />
                                            <h5>PHP</h5>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="tech-item">
                                            <img src={bootstrap} alt="bootstrap" />
                                            <h5>Bootstrap</h5>
                                            <img src={js} alt="js" />
                                            <h5>JavaScript</h5>
                                            <img src={react} alt="react" />
                                            <h5>React</h5>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="tech-item">
                                            <img src={jetpack} alt="jetpack" />
                                            <h5>Jetpack</h5>
                                            <img src={sql} alt="sql" />
                                            <h5>My SQL</h5>
                                            <img src={firebase} alt="firebase" />
                                            <h5>Firebase</h5>
                                        </div>
                                    </Col>
                                </Row>
                            </div>}
                            </TrackVisibility>
                            <p>Tools I'm Using</p>
                            <TrackVisibility>
                            {({ isVisible }) =>
                            <div className={isVisible ? "animate__animated animate__fadeInLeftBig" : ""}>
                                <Row>
                                    <Col>
                                        <div className="tech-item">
                                            <img src={flutterflow} alt="flutterflow" />
                                            <h5>Flutter Flow</h5>
                                            <img src={androidstudio} alt="androidstudio" />
                                            <h5>Android Studio</h5>
                                            <img src={vscode} alt="vscode" />
                                            <h5>VS Code</h5>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="tech-item">
                                            <img src={intelliJ} alt="intelliJ" />
                                            <h5>IntelliJ</h5>
                                            <img src={phpstorm} alt="phpstorm" />
                                            <h5>PHP Storm</h5>
                                            <img src={postman} alt="postman" />
                                            <h5>Postman</h5>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="tech-item">
                                            <img src={figma} alt="figma" />
                                            <h5>Figma</h5>
                                            <img src={photoshop} alt="photoshop" />
                                            <h5>Photoshop</h5>
                                            <img src={jira} alt="jira" />
                                            <h5>Jira</h5>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="tech-item">
                                            <img src={sourcetree} alt="sourcetree" />
                                            <h5>Source Tree</h5>
                                            <img src={gitlab} alt="gitlab" />
                                            <h5>Gitlab</h5>
                                            <img src={github} alt="github" />
                                            <h5>Github</h5>
                                        </div>
                                    </Col>
                                </Row>
                            </div>}
                            </TrackVisibility>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container>
            {/* <img className="background-image-left" src={harru} /> */}
        </section>
    )
}