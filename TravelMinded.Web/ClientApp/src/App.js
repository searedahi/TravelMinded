import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Experiences from './components/Experiences';
import ExperienceDetails from './components/ExperienceDetails';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
        <Route path='/experiences' component={Experiences} />
        <Route path='/experience/:id' component={ExperienceDetails} />
        <Route path='/experiencedetails/:id' component={ExperienceDetails} />

    </Layout>
);
