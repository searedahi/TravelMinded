import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Experiences';
import './Experiences.css';
import { Col, Row, Carousel } from 'react-bootstrap';


class Experiences extends Component {

    componentWillMount() {
        // This method runs when the component is first added to the page
        this.isLoading = true;
        this.props.loadAllExperiences();
    }

    componentWillReceiveProps(nextProps) {
        // This method runs when incoming props (e.g., route params) change
        const startDateIndex = parseInt(nextProps.match.params.startDateIndex, 10) || 0;
        this.props.requestExperiences(startDateIndex);
    }

    render() {
        return (
            renderExperiencesTable(this.props.experiences)
        );
    }
}

function renderExperiencesTable(experiences) {
    return (

        <Row>
            {experiences.map(experience =>
                <Col sm={12} md={6} lg={4} className="fullWidthColumn">
                    <Carousel indicators={false} controls={false} wrap={true}>
                        <Carousel.Item className="experiencesItemWrapper" >
                            <Link to={`experience/${experience.id}`}>
                                <img
                                    className="experiencesImg"
                                    alt="A generic snapshot of the experience."
                                    src={experience.imageCdnUrl === '' ? 'https://localhost:44307/images/island(35).jpg' : experience.imageCdnUrl} />
                                <Carousel.Caption>
                                    <h3>{experience.name}</h3>
                                    <p>{experience.descriptionShort}</p>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                        {renderImages(experience)}
                    </Carousel>
                </Col>
            )}
        </Row>
    );
}

function renderImages(experience) {

    var imgList = experience.images;

    return (
       imgList.map(image =>
            <Carousel.Item className="carouselItemWrapper" >
                <Link to={`experience/${experience.id}`}>
                    <img
                        className="experiencesImg"
                        alt="A generic snapshot of the experience."
                        src={image.imageCdnUrl === '' ? 'https://cdn.cnn.com/cnnnext/dam/assets/151030143154-burt-reynolds-smokey-and-the-bandit-full-169.jpg' : image.imageCdnUrl} />
                    <Carousel.Caption>
                        <h3>{experience.name}</h3>
                        <p>{experience.descriptionShort}</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        )
    );
}

export default connect(state => state.experiences, dispatch => bindActionCreators(actionCreators, dispatch))(Experiences);