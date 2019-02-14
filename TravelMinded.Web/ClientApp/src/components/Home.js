import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';


const Home = props => (
    <section>
        <Row>
            <Col xs={12}>
                Full Page Video Background
            </Col>
        </Row>
    </section>
);

export default connect()(Home);
