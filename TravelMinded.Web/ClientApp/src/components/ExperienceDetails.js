import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { experienceDetailsActionCreators } from '../store/ExperienceDetails';
import { Col, Row, Button, Carousel } from 'react-bootstrap';
import './ExperienceDetails.css';




class ExperienceDetails extends Component {

    componentWillMount() {
        // This method runs when the component is first added to the page
        const experienceId = parseInt(this.props.match.params.id, 10) || 0;
        this.isLoading = true;
        this.props.getExperienceDetails(experienceId);
    }

    render() {
        return (
            renderExperienceDetails(this.props.experienceDetails)
        );
    }
}



function renderExperienceDetails(experienceDetails) {
    return (
        <div>
            <Row>
                <Col sm={12} lg={12}>
                    <Carousel indicators={false} controls={false} wrap={true}>
                        <Carousel.Item className="carouselItemWrapper" >
                            <img
                                className="experiencesImg"
                                alt="A generic snapshot of the experience."
                                src={experienceDetails.imageCdnUrl === '' ? 'https://localhost:44307/images/island(35).jpg' : experienceDetails.imageCdnUrl} />
                        </Carousel.Item>
                        {renderExperienceImages(experienceDetails)}
                    </Carousel>
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} lg={6} >
                    <h3>{experienceDetails.name}</h3>
                    <p>{experienceDetails.nextAvailableDateFormatted}</p>
                    <p>{experienceDetails.description}</p>
                </Col>
            </Row>
        </div>
    );
}

function renderExperienceImages(experienceDetails) {

    if (experienceDetails.images === undefined) {
        return (
            <img
                alt="A generic snapshot of the experience."
                src="https://cdn.cnn.com/cnnnext/dam/assets/151030143154-burt-reynolds-smokey-and-the-bandit-full-169.jpg" />
        );
    }

    var imgList = experienceDetails.images;

    return (
        imgList.map(image =>
            <Carousel.Item>
                <img
                    alt="A generic snapshot of the experience."
                    src={image.imageCdnUrl === '' ? 'https://cdn.cnn.com/cnnnext/dam/assets/151030143154-burt-reynolds-smokey-and-the-bandit-full-169.jpg' : image.imageCdnUrl} />
            </Carousel.Item>
        )
    );
}

function renderExperienceHtml(experienceDetails) {
    return (
        <div dangerouslySetInnerHTML={{ __html: experienceDetails.descriptionSafeHtml }}>
        </div>
    );
}


export default connect(
    state => state.experienceDetails,
    dispatch => bindActionCreators(experienceDetailsActionCreators, dispatch)
)(ExperienceDetails);
