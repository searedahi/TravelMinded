import React, { Component } from 'react';
import { Route } from 'react-router'
import { Layout } from '../components/Layout'
import { Home } from '../components/Home'
import NoMatch from '../components/NoMatch'
import  Experiences  from '../components/Experiences';
import  ExperienceDetails  from '../components/ExperienceDetails';


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/experiences' component={Experiences} />
                <Route path='/experience/:id' component={ExperienceDetails} />
                <Route path='/experiencedetails/:id' component={ExperienceDetails} />
            </Layout>
        );
    }
}