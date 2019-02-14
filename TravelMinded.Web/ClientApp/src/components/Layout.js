import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import NavMenu from './NavMenu';

export default props => (
    <Container>
        <Row>
            <Col>
                <NavMenu />
            </Col>
            <Col sm={12} lg={12}>
                {props.children}
            </Col>
        </Row>
    </Container>
);
