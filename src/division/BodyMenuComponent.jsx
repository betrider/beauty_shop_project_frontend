import React, {Component} from "react"; 
import {BrowserRouter as Router, Route} from "react-router-dom"; 
import MainComponent from '../component/MainComponent';
import AlbumComponent from '../component/AlbumComponent';
import PriceListComponent from '../component/PriceListComponent';
import ScheduleComponent from '../component/ScheduleComponent' ;
import SignInComponent from '../component/SignInComponent';
import SignUpComponent from '../component/SignUpComponent';
import SignInSideComponent from '../component/SignInSideComponent';

class BodyMenuComponent extends Component { 
    render() { 
        return ( 
            <Router> 
                <Route path="/" exact component={MainComponent} /> 
                <Route path="/AlbumComponent" component={AlbumComponent} /> 
                <Route path="/PriceListComponent" component={PriceListComponent} /> 
                <Route path="/SignInComponent" component={SignInComponent} /> 
                <Route path="/SignUpComponent" component={SignUpComponent} /> 
                <Route path="/SignInSideComponent" component={SignInSideComponent} /> 
                <Route path="/ScheduleComponent" component={ScheduleComponent} /> 
            </Router> 
        ) 
    } 
} 
        
export default BodyMenuComponent;
