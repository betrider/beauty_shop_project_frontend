import React, {Component} from "react"; 
import logo from '../image/myAgit_logo.jpg';
import {Navbar,Nav,Form,FormControl,Button,NavDropdown} from "react-bootstrap"; 
import {BrowserRouter as Router, Route} from "react-router-dom"; 
import MainComponent from './MainComponent' 
import AlbumComponent from './AlbumComponent' 
import PriceListComponent from './PriceListComponent' 
import ScheduleComponent from './ScheduleComponent' 
import SignInComponent from './SignInComponent'
import SignUpComponent from './SignUpComponent'
import SignInSideComponent from './SignInSideComponent'
import '../css/custom.css'

class TopMenuComponent extends Component { 
    render() { 
        return ( 
        <Router>
            <Navbar collapseOnSelect expand="lg" className="bg-primary">
                <Navbar.Brand href="/main">
                    <img
                        alt=""
                        src={logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    마이아지트
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/main">홈</Nav.Link>
                        <Nav.Link href="/PriceListComponent">예약</Nav.Link>
                        <Nav.Link href="/PriceListComponent">오시는길</Nav.Link>
                        <Nav.Link href="/AlbumComponent">갤러리</Nav.Link>
                        <Nav.Link href="/PriceListComponent">소식</Nav.Link>
                        <Nav.Link href="/PriceListComponent">요금표</Nav.Link>
                        <Nav.Link href="/ScheduleComponent">스케줄</Nav.Link>
                        {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>*/}
                    </Nav>
                    <Nav>
                        <Nav.Link href="/SignInComponent">로그인</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
            <Route path="/main" component={MainComponent} /> 
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
        
export default TopMenuComponent;
