import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { experienceDetailsActionCreators } from '../reducers/ExperienceDetails';
import { Col, Row, Carousel, Button } from 'reactstrap';
import './ExperienceDetails.css';
import CustomerTypeLineItem from './CustomerTypeLineItem';

class ExperienceDetails extends Component {

    componentWillMount() {
        // This method runs when the component is first added to the page
        const experienceId = parseInt(this.props.match.params.id, 10) || 0;
        this.isLoading = true;
        this.props.getExperienceDetails(experienceId);
    }

    render() {
        return (
            <section>
                {renderSpotlightCarousel(this.props.experienceDetails)}
                {renderExperienceInfoAndAvail(this.props.experienceDetails)}
                {renderTravelMindedTips(this.props.experienceDetails)}
            </section>
        );
    }
}


const activeDates = [
    new Date(2019, 1, 24),
    new Date(2019, 1, 25),
    new Date(2019, 1, 26),
    new Date(2019, 1, 27),
    new Date(2019, 1, 28),
    new Date(2019, 2, 5),
    new Date(2019, 2, 3),
    new Date(2019, 2, 4)
];


function renderExperienceInfoAndAvail(experienceDetails) {

    let todaysDate = new Date(2019, 0, 1);
    if (experienceDetails.nextAvailableDate !== undefined) {
        var serverDate = new Date(experienceDetails.nextAvailableDate);
        todaysDate = serverDate;
    }

    let availableDates = [];
    if (experienceDetails !== undefined && experienceDetails.availabilities !== undefined) {
        experienceDetails.availabilities.map(ava => availableDates.push(new Date(Date.parse(ava.startAt))));
    }

    if (experienceDetails.customerPrototypes === undefined) {
        return (<Row><Col>NO DATA</Col></Row>);
    } else {
        return (
            <Row>
                <Col sm={12} md={8} lg={8}>
                    <div className="experienceDetailsSingleLine">
                        <span className="experienceDetailsName">{experienceDetails.name}</span>{renderCompanyName(experienceDetails)}
                    </div>
                    <div>
                        <span className="experienceDetailsDurationLocation">{experienceDetails.durationFormatted}  {experienceDetails.location}</span>
                    </div>
                    <p className="experienceDetailsDescription">{experienceDetails.description}</p>
                    <p>{experienceDetails.nextAvailableDateFormatted}</p>
                </Col>
                <Col sm={12} md={4} lg={4}>
                    {experienceDetails.customerPrototypes.map(cType =>
                        <CustomerTypeLineItem customerType={cType} />
                    )}

                </Col>
            </Row>
        );
    }
}

function tileClassName(date, view) {
    console.log('experienceIsRed');

    let classes = [];
    classes.push('experienceIsRed');
    return classes;
}


function tileDisabled(dateArg) {
    return checkActiveDates(dateArg);
}

function onExperienceDateChange(dateSelected, event) {
    console.log('Date Selected: ' + dateSelected);
}


function onHeadcountChange(value, event) {
    console.log('Headcount Changed: ' + value);
}






function checkActiveDates(dateArg) {
    let doMatch = activeDates.some(activeDate => {
        return doDatesMatch(dateArg, activeDate);
    });
    return doMatch;
}

function doDatesMatch(dateArg, dateComp) {
    return dateArg.date.getFullYear() === dateComp.getFullYear() &&
        dateArg.date.getMonth() === dateComp.getMonth() &&
        dateArg.date.getDate() === dateComp.getDate();
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
                    key="123"
                    className="experienceDetailsImg"
                    alt="A generic snapshot of the experience."
                    src="https://cdn.cnn.com/cnnnext/dam/assets/151030143154-burt-reynolds-smokey-and-the-bandit-full-169.jpg" />
            </Carousel.Item>
        );
    }

    var imgList = experienceDetails.images;

    return (
        imgList.map(image =>
            <Carousel.Item className="carouselItemWrapper" key="{image.id}">
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

function renderTravelMindedTips(experienceDetails) {

    if (experienceDetails.proTips === undefined) {
        return (
            <p>No pro tips</p>
        );
    }

    var proTips = experienceDetails.proTips;
    return (
        <Row>
            <Col>
                {proTips.map(pTip =>
                    <p key={pTip.id}>{pTip.description}</p>)}
            </Col>
        </Row>
    );
}


export default connect(
    state => state.experienceDetails,
    dispatch => bindActionCreators(experienceDetailsActionCreators, dispatch)
)(ExperienceDetails);
