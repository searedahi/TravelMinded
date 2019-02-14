import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../reducers/ExperienceCalculator';
import { Col, Row, Carousel, Button } from 'reactstrap';
import Calendar from 'react-calendar';


class ExperienceCalculator extends Component {

    render() {
        return (
            renderExperienceCalculator(this.props.experienceDetails)
        );
    }
}


function renderExperienceCalculator(experienceDetails) {
    return (
        <div>
            <table className="customerTypesTable">
                <colgroup>
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "60%" }} />
                </colgroup>
                <tbody>
                    {renderCustomerTypes(experienceDetails)}
                    <tr>
                        <td />
                        <td />
                        <td><Button className='bookNowButton btn btn-success'>Book Now!</Button></td>
                    </tr>
                </tbody>
            </table>

            <section className="experienceDetailsCalendarSection">
                <Calendar
                    tileClassName={{ tileClassName }}
                    value={todaysDate}
                    onChange={onExperienceDateChange}
                    tileDisabled={tileDisabled}
                />
            </section>
        </div>
    );
}

function renderCustomerTypes(experienceDetails) {
    if (experienceDetails.customerPrototypes === undefined) {

        return (
            <tr key={'none'}>
                <td>No Customer Types</td>
            </tr>
        );

    } else {

        return (
            experienceDetails.customerPrototypes.map(cType =>
                (
                    <tr key={cType.pk}>
                        <td>
                            <h2 style={{ margin: "0.25em" }}>
                                <NumberFormat value={cType.total / 100} displayType={'text'} prefix={'$'} decimalScale={2} />
                            </h2>
                        </td>
                        <td>
                            <div className="headcountPicker">
                                <NumericInput
                                    id="headcount"
                                    className="form-control headcountPicker"
                                    min={1}
                                    max={10}
                                    onChange={onHeadcountChange}
                                    mobile
                                />
                            </div>
                        </td>
                        <td>
                            <h4 style={{ margin: "0.25em" }}>{cType.displayName}</h4>
                        </td>
                    </tr>
                )
            )
        );
    }

}


export default connect(
    state => state.experienceDetails,
    dispatch => bindActionCreators(experienceCalculatorActionCreators, dispatch)
)(ExperienceCalculator);