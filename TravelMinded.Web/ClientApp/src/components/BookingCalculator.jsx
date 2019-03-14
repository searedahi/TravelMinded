import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    Col,
    Row,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import { incrementCTLI, decrementCTLI } from '../actions/CustomerTypeLineItemActions';
import CustomerTypeLineItem from './CustomerTypeLineItem';

class BookingCalculator extends Component {
    componentDidMount() {
        const { experienceDetails } = this.props;
        experienceDetails
            .customerPrototypes
            .map(cType => (
                this.generateCTLI(cType)
            ));
    }

    generateCTLI(cType) {
        const idx = this.props.bookingCalculator.tixList.findIndex(ticket => ticket.id === cType.id);

        if (idx === undefined || idx === -1) {
            return (
                <CustomerTypeLineItem
                    customerType={cType}
                    key={cType.id}
                    quantity={0}
                    experienceId={this.props.experienceDetails.id}
                />
            );
        }

        const qty = this.props.bookingCalculator.tixList[idx].quantity;
        return (
            <CustomerTypeLineItem
                customerType={cType}
                key={cType.id}
                quantity={qty}
                experienceId={this.props.experienceDetails.id}
            />
        );
    }

    render() {
        const { experienceDetails } = this.props;

        if (experienceDetails === undefined || experienceDetails.customerPrototypes === undefined || experienceDetails.customerPrototypes.length === 0) {
            return (
                <h4>No Booking Calculator</h4>
            );
        }

        return (
            experienceDetails
            .customerPrototypes
                .map(cType => (
                    this.generateCTLI(cType)
                ))
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...state,
    isLoading: state.isLoading,
    experienceDetails: ownProps.experienceDetails,
    tixList: state.tixList,
});

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators({ incrementCTLI, decrementCTLI }, dispatch),
)(BookingCalculator);
