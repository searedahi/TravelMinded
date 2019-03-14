import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import {
    Col,
    Row,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import { incrementCTLI, decrementCTLI } from '../actions/CustomerTypeLineItemActions';

class CustomerTypeLineItem extends Component {
    constructor() {
        super();
        this.incrementClick = this.incrementClick.bind(this);
        this.decrementClick = this.decrementClick.bind(this);
    }

    decrementClick() {
        // handle click
        const scopedProps = this.props;
        scopedProps.decrementCTLI(scopedProps.customerType);
    }

    incrementClick() {
        // handle click
        const scopedProps = this.props;
        scopedProps.incrementCTLI(scopedProps.customerType);
    }

    render() {
        const { customerType } = this.props;
        const { displayName } = customerType;
        const { pk } = customerType;
        const { total } = customerType;

        const { customerTypeLineItem } = this.props;
        const { quantity } = this.props;
        const htmlToRender = (
            <div>
                <Row>
                    <h4 style={{ margin: '0.25em' }}>{displayName}</h4>
                </Row>
                <Row key={pk}>
                    <Col>
                        <h3 style={{ margin: '0.25em' }}>
                            <NumberFormat value={total / 100} displayType="text" prefix="$" decimalScale={2} />
                        </h3>
                    </Col>
                    <Col>
                        <div className="headcountPicker">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <Button color="danger" style={{ opacity: 0.5 }} onClick={this.decrementClick}> - </Button>
                                </InputGroupAddon>
                                <Input value={quantity} />
                                <InputGroupAddon addonType="append">
                                    <Button color="success" style={{ opacity: 0.5 }} onClick={this.incrementClick}> + </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    </Col>
                </Row>
            </div>
        );
        return htmlToRender;
    }
}


CustomerTypeLineItem.propTypes = {
    customerType: PropTypes.shape({
        pk: PropTypes.number,
        displayName: PropTypes.string,
        total: PropTypes.number,
    }).isRequired,
    customerTypeLineItem: PropTypes.shape({
        quantity: PropTypes.number,
    }),
    quantity: PropTypes.number,
};

CustomerTypeLineItem.defaultProps = {
    quantity: 0,
};

const mapStateToProps = (state, ownProps) => ({
    ...state,
    isLoading: state.isLoading,
    customerType: ownProps.customerType,
    quantity: ownProps.quantity,
});

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({ incrementCTLI, decrementCTLI }, dispatch),
)(CustomerTypeLineItem);
