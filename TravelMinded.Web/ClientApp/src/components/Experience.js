import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { experienceActionCreators } from '../store/Experience';
import { Col,  Row, Button, Carousel } from 'react-bootstrap';




class Experience extends Component {

    componentWillMount() {
        // This method runs when the component is first added to the page
        const experienceId = parseInt(this.props.match.params.id, 10) || 0;
        this.isLoading = true;
        this.props.getExperience(experienceId);
    }

    render() {
        return (
            renderExperience(this.props)
        );
    }
}



function renderExperience(props) {
    const expName = 'norm';
    let expNameFromPropr = props.experience;

    return (
        <Row>
            <h3>Experience Details</h3>
            <p>{expName}</p>
        </Row>
    );
}

function renderImages(experience) {

    var imgList = experience.images;

    return (
        imgList.map(image =>
            <Carousel.Item width={900} height={500} key={experience.id}>
                    <img
                        alt="A generic snapshot of the experience."
                        src={image.imageCdnUrl === '' ? 'https://cdn.cnn.com/cnnnext/dam/assets/151030143154-burt-reynolds-smokey-and-the-bandit-full-169.jpg' : image.imageCdnUrl} />
                    <Carousel.Caption>
                        <h3>{experience.name}</h3>
                        <p>{experience.descriptionShort}</p>
                    </Carousel.Caption>
            </Carousel.Item>
        )
    );
}




export default connect(
    state => state.counter,
    dispatch => bindActionCreators(experienceActionCreators, dispatch)
)(Experience);
