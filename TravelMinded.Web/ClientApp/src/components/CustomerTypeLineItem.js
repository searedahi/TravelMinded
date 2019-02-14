import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { customerTypeLineItemActionCreators } from '../reducers/CustomerTypeLineItem';
import { Col, Row, Button, InputGroup, FormControl } from 'reactstrap';
import NumberFormat from 'react-number-format';


class CustomerTypeLineItem extends Component {

    render() {
        if (this.props.customerType === undefined) {

            return (
                <Row key={'none'}>
                    <Col colSpan>No Customer Type Supplied</Col>
                </Row>
            );

        } else {

            return (
                <Row key={this.props.customerType.pk}>
                    <Col>
                        <h2 style={{ margin: "0.25em" }}>
                            <NumberFormat value={this.props.customerType.total / 100} displayType={'text'} prefix={'$'} decimalScale={2} />
                        </h2>
                    </Col>
                    <Col>
                        <div className="headcountPicker">
                            <div className="form-group">
                                <label htmlFor="formGroupExampleInput">Default input</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formGroupExampleInput"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <h4 style={{ margin: "0.25em" }}>{this.props.customerType.displayName}</h4>
                    </Col>
                </Row>
            );
        }
    }
}



export default connect(
    state => state.customerType,
    dispatch => bindActionCreators(customerTypeLineItemActionCreators, dispatch)
)(CustomerTypeLineItem);