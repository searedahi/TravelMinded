import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../components/Home'
import Counter from '../components/Counter'
import NoMatch from '../components/NoMatch'
import NavBar from '../components/NavMenu'
import FetchData from '../components/FetchData';
import Experiences from '../components/Experiences';
import ExperienceDetails from '../components/ExperienceDetails';

const routes = (
    <div>
        <NavBar />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/counter" component={Counter} />
            <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
            <Route path='/experiences' component={Experiences} />
            <Route path='/experience/:id' component={ExperienceDetails} />
            <Route path='/experiencedetails/:id' component={ExperienceDetails} />
            <Route component={NoMatch} />
        </Switch>
    </div>
)

export default routes