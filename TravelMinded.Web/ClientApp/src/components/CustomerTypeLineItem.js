import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCTLI, removeCTLI } from '../actions/CustomerTypeLineItem';
import { Col, Row, Button, Input, InputGroup, InputGroupAddon } from 'reactstrap';
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
                <div>
                    <Row>
                        <h4 style={{ margin: "0.25em" }}>{this.props.customerType.displayName}</h4>
                    </Row>
                    <Row key={this.props.customerType.pk}>
                        <Col>
                            <h3 style={{ margin: "0.25em" }}>
                                <NumberFormat value={this.props.customerType.total / 100} displayType={'text'} prefix={'$'} decimalScale={2} />
                            </h3>
                        </Col>
                        <Col>
                            <div className="headcountPicker">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <Button color="danger" style={{ opacity: 0.5 }} onClick={this.props.removeCTLI.bind(null,this.props.customerType)}> - </Button>
                                    </InputGroupAddon>
                                    <Input type={Number} placeholder="0">{this.props.quantity}</Input>
                                    <InputGroupAddon addonType="append">
                                        <Button color="success" style={{ opacity: 0.5 }} onClick={this.props.addCTLI.bind(null,this.props.customerType)}> + </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        </Col>
                    </Row>
                </div>

            );
        }
    };
}


const mapStateToProps = (state, ownProps) => ({
    isLoading: state.isLoading,
    customerType: ownProps.customerType,
    quantity: state.quantity,
    tixToBuy: state.tixToBuy,
    ...state
});


export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({ addCTLI, removeCTLI}, dispatch)
)(CustomerTypeLineItem);