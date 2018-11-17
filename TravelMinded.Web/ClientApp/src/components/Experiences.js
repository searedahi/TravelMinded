import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Experiences';
import './Experiences.css';
import { Col, Grid, Row } from 'react-bootstrap';


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
            <div>
                <h1>All Experiences</h1>
                <p>By land, sea or air.  We've got you covered.</p>
                {renderExperiencesTable(this.props)}
                {renderPagination(this.props)}
            </div>
        );
    }
}

function renderExperiencesTable(props) {
    return (

        <Row>
            {props.experiences.map(experience =>
                <Col sm={12} md={6} lg={6} >
                    <div class="experienceWrap" style={{ backgroundImage: `url(${experience.imageCdnUrl === '' ? 'https://cdn.cnn.com/cnnnext/dam/assets/151030143154-burt-reynolds-smokey-and-the-bandit-full-169.jpg' : experience.imageCdnUrl})` }} >
                        <h3>{experience.name}</h3>
                    </div>
                </Col>
            )}
        </Row>
    );
}




function renderPagination(props) {
    const prevStartDateIndex = (props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (props.startDateIndex || 0) + 5;

    return <p className='clearfix text-center'>
        <Link className='btn btn-default pull-left' to={`/experiences/${prevStartDateIndex}`}>Previous</Link>
        <Link className='btn btn-default pull-right' to={`/experiences/${nextStartDateIndex}`}>Next</Link>
        {props.isLoading ? <span>Loading...</span> : []}
    </p>;
}
export default connect(state => state.experiences, dispatch => bindActionCreators(actionCreators, dispatch))(Experiences);