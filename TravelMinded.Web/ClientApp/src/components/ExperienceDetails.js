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
            {renderSpotlightCarousel(experienceDetails)}
            <Row>
                <Col sm={12} md={8} lg={8} >
                    <div className="experienceDetailsSingleLine">
                        <span className="experienceDetailsName">{experienceDetails.name}</span>{renderCompanyName(experienceDetails)}
                    </div>
                    <div>
                        <span className="experienceDetailsDurationLocation">{experienceDetails.durationFormatted}  {experienceDetails.location}</span>
                    </div>                    
                    <p className="experienceDetailsDescription">{experienceDetails.description}</p>
                    <p>{experienceDetails.nextAvailableDateFormatted}</p>
                </Col>
            </Row>
        </div>
    );
}


function renderSpotlightCarousel(experienceDetails) {
    return (
        <Row className="experienceDetailImagesRow">
            <Col sm={12} md={12} lg={12} className="experienceDetailImagesCol">
                <Carousel indicators={false} controls={false} wrap={true} interval={7500}>
                    <Carousel.Item className="carouselItemWrapper" >
                        <img
                            className="experienceDetailsImg"
                            alt="A generic snapshot of the experience."
                            src={experienceDetails.imageCdnUrl === '' ? 'https://localhost:44307/images/island(35).jpg' : experienceDetails.imageCdnUrl} />
                        <div className="experienceDetailsSpotlight" >
                            <h2>{experienceDetails.name}</h2>
                        </div>
                    </Carousel.Item>
                    {renderExperienceImages(experienceDetails)}
                </Carousel>
            </Col>
        </Row>
        );

}

function renderExperienceImages(experienceDetails) {

    if (experienceDetails.images === undefined) {
        return (
            <Carousel.Item className="carouselItemWrapper">
                <img
                    className="experienceDetailsImg"
                    alt="A generic snapshot of the experience."
                    src="https://cdn.cnn.com/cnnnext/dam/assets/151030143154-burt-reynolds-smokey-and-the-bandit-full-169.jpg" />
            </Carousel.Item>
        );
    }

    var imgList = experienceDetails.images;

    return (
        imgList.map(image =>
            <Carousel.Item className="carouselItemWrapper">

                <img
                    className="experienceDetailsImg"
                    alt="A generic snapshot of the experience."
                    src={image.imageCdnUrl === '' ? 'https://cdn.cnn.com/cnnnext/dam/assets/151030143154-burt-reynolds-smokey-and-the-bandit-full-169.jpg' : image.imageCdnUrl} />
                <div className="experienceDetailsSpotlight" >
                    <h2>{experienceDetails.name}</h2>
                </div>
            </Carousel.Item>
        )
    );
}

function renderCompanyName(experienceDetails) {

    if (experienceDetails.company === undefined) {
        return (<span className="experienceDetailsCompany">by Geeky Tours</span>);
    }

    var company = experienceDetails.company;

    return (<span className="experienceDetailsCompany"> by {company.name}</span>);
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
