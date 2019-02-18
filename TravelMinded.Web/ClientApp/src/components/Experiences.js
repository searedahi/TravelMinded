import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { experienceActionCs } from '../reducers/Experiences';
import './Experiences.css';
import ImageCarousel from './ImageCarousel';
import {
    Col,
    Row
} from 'reactstrap';


class Experiences extends Component {

    componentDidMount() {
        // This method runs when the component is first added to the page
        this.isLoading = true;
        this.props.loadAllExperiences();
    }

    //componentWillReceiveProps(nextProps) {
    //    // This method runs when incoming props (e.g., route params) change
    //    const startDateIndex = parseInt(nextProps.match.params.startDateIndex, 10) || 0;
    //    this.props.requestExperiences(startDateIndex);
    //}

    render() {
        return (
            renderExperiencesTable(this.props.experiences)
        );
    }
}


function renderExperiencesTable(experiences) {
    console.log(experiences.experiences);
    if (experiences.experiences === undefined || experiences.experiences.length == 0) {
        return (<Row>No experiences</Row>);
    }
    else {
        var experience = experiences.experiences[0];

        return (
            <Row>
                <Col sm={12} md={6} lg={4} className="fullWidthColumn">
                    <ImageCarousel />
                </Col>
            </Row>
        );
    }
}

//function renderImages(experience) {

//    var imgList = experience.images;
//    if (imgList !== undefined && imgList.length > 0) {


//        return (
//            imgList.map(image =>
//                <Carousel.Item className="carouselItemWrapper" >
//                    <Link to={`experience/${experience.id}`}>
//                        <img
//                            className="experiencesImg"
//                            alt="A generic snapshot of the experience."
//                            src={image.imageCdnUrl === '' ? 'https://cdn.cnn.com/cnnnext/dam/assets/151030143154-burt-reynolds-smokey-and-the-bandit-full-169.jpg' : image.imageCdnUrl} />
//                        <Carousel.Caption>
//                            <h3>{experience.name}</h3>
//                            <p>{experience.descriptionShort}</p>
//                        </Carousel.Caption>
//                    </Link>
//                </Carousel.Item>
//            )
//        );
//    }
//}

/*
map state to props
*/
const mapStateToProps = state => ({
    experiences: state.experiences,
    isLoading: state.isLoading
});

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(experienceActionCs, dispatch)
)(Experiences);