import { Col } from "react-bootstrap";

export const ProjectCard = ({title, description, image}) => {
    return(
        <Col sm={6} md={4}>
            <div className="proj-imgbx">
                <img src={image} />
                <h5>{title}</h5>
                <div className="proj-txtx">
                    <span>{description}</span>
                </div>
            </div>
        </Col>
    )
}