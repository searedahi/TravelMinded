import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { experienceDetailsActionCreators } from '../store/ExperienceDetails';
import { Col, Row, Button, Carousel } from 'react-bootstrap';
import './ExperienceDetails.css';
import NumericInput from 'react-numeric-input';
import Calendar from 'react-calendar';
import NumberFormat from 'react-number-format';

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
            </section>
        );
    }
}

const activeDates = [
    new Date(2018, 10, 24),
    new Date(2018, 10, 25),
    new Date(2018, 10, 26),
    new Date(2018, 10, 27),
    new Date(2018, 10, 28),
    new Date(2018, 11, 5),
    new Date(2018, 11, 3),
    new Date(2018, 11, 4)
];

function renderExperienceInfoAndAvail(experienceDetails) {


    var todaysDate = new Date(2019, 0, 1);
    if (experienceDetails.nextAvailableDate !== undefined) {
        var serverDate = new Date(experienceDetails.nextAvailableDate);
        todaysDate = serverDate;
    }
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
                <h4>Discouinted rate</h4>
                <h2>
                    <NumberFormat value={experienceDetails.currentAdultPrice} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
                </h2>
                <p>Check Availability:</p>
                <NumericInput
                    id="headcount"
                    className="form-control"
                    min={1}
                    max={10}
                    onChange={onHeadcountChange}
                />
                <section id="experienceDetailsCalendarSection">
                    <Calendar
                        onChange={onExperienceDateChange}
                        value={todaysDate}
                        tileClassName={getTileClassName}
                    />
                </section>


            </Col>
        </Row>
    );
}

function onHeadcountChange(value, event) {
    console.log('Headcount Changed: ' + value);
}


function onExperienceDateChange(dateSelected, event) {
    console.log('Date Selected: ' + dateSelected);
}

function doDatesMatch(dateArg, dateComp) {

    var y1 = dateArg.date.getFullYear();
    var y2 = dateComp.getFullYear();
    var yearsMatch = y1 === y2;

    var m1 = dateArg.date.getMonth();
    var m2 = dateComp.getMonth();
    var monthsMatch = m1 === m2;

    var d1 = dateArg.date.getDate();
    var d2 = dateComp.getDate();
    var datesMatch = d1 === d2;

    var isMatch = yearsMatch
        && monthsMatch
        && datesMatch;

    return isMatch;
}


function tileDisabled(dateArg, view) {
    return activeDates.some(activeDate => {
        return doDatesMatch(dateArg, activeDate);
    });
}

function getTileClassName(dateArg, view) {
    if (
        activeDates.some(activeDate => {
            return doDatesMatch(dateArg, activeDate);
        })
    ) {
        return 'experienceIsAvailable';
    }
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

function renderTravelMindedTips(experienceDetails) {

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


export default connect(
    state => state.experienceDetails,
    dispatch => bindActionCreators(experienceDetailsActionCreators, dispatch)
)(ExperienceDetails);
