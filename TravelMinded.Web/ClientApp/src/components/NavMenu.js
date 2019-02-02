import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
                <Link to={'/'}>
                    <img src="/logos/travel_minded_white.png" className="navbarImg" alt="Travel Minded logo" />
                </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to={'/lodgings'}>
          <NavItem>
            <Glyphicon glyph='home' /> Lodgings
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/experiences'}>
          <NavItem>
           <Glyphicon glyph='camera' /> Experiences
          </NavItem>
        </LinkContainer>
        <LinkContainer to={'/cart'}>
            <NavItem>
                <Glyphicon glyph='shopping-cart' /> Cart
            </NavItem>
        </LinkContainer>
        <LinkContainer to={'/profile'}>
            <NavItem>
                <Glyphicon glyph='user' /> Profile
            </NavItem>
         </LinkContainer>
         <LinkContainer to={'/fake'}>
            <NavItem>
                        <Glyphicon glyph='glyphicon glyphicon-cog' className="indicatorScreenSize"/> <span className="indicatorScreenSize">Admin</span>
            </NavItem>
         </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
