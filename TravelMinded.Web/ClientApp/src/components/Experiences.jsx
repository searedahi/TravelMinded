import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';
import { fetchExperiencesBegin, fetchExperiencesSuccess } from '../actions/ExperiencesActions';
import './Experiences.css';


class Experiences extends Component {
    componentDidMount() {
        // This method runs when the component is first added to the page
        this.isLoading = true;
    }

    componentWillMount() {
        this.fetchAllExperiences();
    }

    fetchAllExperiences = async () => {
        this.props.fetchExperiencesBegin();

        const url = 'api/Experiences/all';
        const experiences = await fetch(url).then(res => res.json());

        this.props.fetchExperiencesSuccess(experiences);
    }

    render() {
        const { experiences: experiencesBase } = this.props;

        if (experiencesBase === undefined
            || experiencesBase.experiences === undefined
            || experiencesBase.experiences.length === 0) {
            return (<Row>No experiences</Row>);
        }

        return (
            experiencesBase.experiences.map(
                exper => (
                    <Row key={exper.id}>
                        <Col sm={12} md={6} lg={4} className="fullWidthColumn">
                            <Link to={`/experience/${exper.id}`}>
                                <div style={{ backgroundImage: `url(${exper.imageCdnUrl})` }}>
                                    <h3>
                                        {exper.name}
                                    </h3>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                ),
            )
        );
    }
}

const mapStateToProps = state => ({
    experiences: state.experiences,
    isLoading: state.isLoading,
});

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({ fetchExperiencesBegin, fetchExperiencesSuccess }, dispatch),
)(Experiences);
