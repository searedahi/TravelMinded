import { Col, Row, Fade } from 'reactstrap';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { fetchExperienceDetailsBegin, fetchExperienceDetailsSuccess } from '../actions/ExperienceDetailsActions';
import { incrementCTLI, decrementCTLI } from '../actions/CustomerTypeLineItemActions';
import './ExperienceDetails.css';
import CustomerTypeLineItem from './CustomerTypeLineItem';

function renderCompanyName(experienceDetails) {
    if (experienceDetails.company === undefined) {
        return (<span className="experienceDetailsCompany">by Geeky Tours</span>);
    }

    const { company } = experienceDetails;

    return (
        <span className="experienceDetailsCompany"> by {company.name}</span>
    );
}

function renderExperienceInfoAndAvail(experienceDetails) {
    let todaysDate = new Date(2019, 0, 1);
    if (experienceDetails !== undefined && experienceDetails.nextAvailableDate !== undefined) {
        todaysDate = new Date(experienceDetails.nextAvailableDate);
    }

    const availableDates = [];
    if (experienceDetails !== undefined && experienceDetails.availabilities !== undefined) {
        experienceDetails.availabilities.map(
            ava => availableDates.push(new Date(Date.parse(ava.startAt))),
        );
    }

    if (experienceDetails === undefined || experienceDetails.customerPrototypes === undefined) {
        return (<Row><Col>NO DATA</Col></Row>);
    }

    return (
        <Row>
            <Col sm={12} md={8} lg={8}>
                <div className="experienceDetailsSingleLine">
                    <span className="experienceDetailsName">{experienceDetails.name}</span>
                    {
                        renderCompanyName(experienceDetails)
                    }
                </div>
                <div>
                    <span className="experienceDetailsDurationLocation">
                        {experienceDetails.durationFormatted}
                        {experienceDetails.location}
                    </span>
                </div>
                <p className="experienceDetailsDescription">{experienceDetails.description}</p>
                <p>{experienceDetails.nextAvailableDateFormatted}</p>
            </Col>
            <Col sm={12} md={4} lg={4}>
                {
                    experienceDetails
                        .customerPrototypes
                        .map(cType => (
                            <CustomerTypeLineItem customerType={cType} key={cType.pk} />
                        ))}
            </Col>
        </Row>
    );
}

function renderSpotlightImage(experienceDetails) {
    if (experienceDetails === undefined
        || experienceDetails.images === undefined
        || experienceDetails.images.length === 0) {
        if (experienceDetails.imageCdnUrl !== undefined) {
            return (
                <Fade key="123">
                    <img
                        className="experienceDetailsImg"
                        alt="A generic snapshot of the experience."
                        src={experienceDetails.imageCdnUrl}

                    />
                </Fade>
            );
        }

        return (
            <Fade key="123">
                <img
                    className="experienceDetailsImg"
                    alt="A generic snapshot of the experience."
                    src="https://cdn.cnn.com/cnnnext/dam/assets/151030143154-burt-reynolds-smokey-and-the-bandit-full-169.jpg"

                />
            </Fade>
        );
    }

    const img1 = experienceDetails.images[0];

    return (
        <Row className="experienceDetailImagesRow">
            <Col sm={12} md={12} lg={12} className="experienceDetailImagesCol">
                <Fade>
                    <img
                        className="experienceDetailsImg"
                        alt="A generic snapshot of the experience."
                        src={img1.imageCdnUrl === '' ? 'https://cdn.cnn.com/cnnnext/dam/assets/151030143154-burt-reynolds-smokey-and-the-bandit-full-169.jpg' : img1.imageCdnUrl}
                    />
                </Fade>

                <div className="experienceDetailsSpotlight">
                    <h2>{experienceDetails.name}</h2>
                </div>
            </Col>
        </Row>
    );
}

function renderTravelMindedTips(experienceDetails) {
    if (experienceDetails === undefined
        || experienceDetails.proTips === undefined
        || experienceDetails.proTips.length === 0) {
        return (
            <p>No pro tips</p>
        );
    }

    const { proTips } = experienceDetails.proTips;
    return (
        <Row>
            <Col>
                {proTips.map(pTip => <p key={pTip.id}>{pTip.description}</p>)}
            </Col>
        </Row>
    );
}


class ExperienceDetails extends Component {
    componentWillMount() {
        const scopedProps = this.props;

        const experienceId = parseInt(scopedProps.match.params.id, 10) || 0;

        this.fetchById(experienceId);
    }

    async fetchById(experienceId) {
        const scopedProps = this.props;

        scopedProps.fetchExperienceDetailsBegin(experienceId);

        const url = `api/ExperienceDetails/${experienceId}`;
        const tmApiResp = await fetch(url);
        const expDets = await tmApiResp.json();

        scopedProps.fetchExperienceDetailsSuccess(expDets);
    }

    render() {
        const { experienceDetails: { experienceDetails } } = this.props;

        return (
            <section>
                {renderSpotlightImage(experienceDetails)}
                {renderExperienceInfoAndAvail(experienceDetails)}
                {renderTravelMindedTips(experienceDetails)}
            </section>
        );
    }
}


const mapStateToProps = state => ({
    experienceDetails: state.experienceDetails,
    isLoading: state.isLoading,
});

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(
        {
            incrementCTLI,
            decrementCTLI,
            fetchExperienceDetailsBegin,
            fetchExperienceDetailsSuccess,
        },
        dispatch,
    ),
)(ExperienceDetails);
