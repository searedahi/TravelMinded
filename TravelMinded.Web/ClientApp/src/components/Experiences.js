import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store/Experiences';
import './Experiences.css';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import { GridList } from 'material-ui/GridList';
import { GridListTile } from 'material-ui/GridList/GridTile';
import { GridListTileBar } from 'material-ui/GridList/GridList';
import { IconButton } from 'material-ui/IconButton';
import { StarBorderIcon } from 'material-ui/svg-icons/toggle/star-border';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
    },
    gridList: {
        width: 500,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)'
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    },
    icon: {
        color: 'white'
    }
});

class Experiences extends Component {

    componentWillMount() {
        // This method runs when the component is first added to the page
        const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
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
    const { classes } = props;

    return (

        <div className={classes.root}>
            <GridList cellHeight={200} spacing={1} className={classes.gridList}>
                {props.experiences.map(tile => (
                    <GridListTile key={tile.imageCdnUrl} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
                        <img src={tile.imageCdnUrl} alt={tile.name} />
                        <GridListTileBar
                            title={tile.name}
                            titlePosition="top"
                            actionIcon={
                                <IconButton className={classes.icon}>
                                    <StarBorderIcon />
                                </IconButton>
                            }
                            actionPosition="left"
                            className={classes.titleBar}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
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
export default compose(
    withStyles(styles, {name:'Experiences'})
    , connect(state => state.experiences, dispatch => bindActionCreators(actionCreators, dispatch))
)(Experiences);