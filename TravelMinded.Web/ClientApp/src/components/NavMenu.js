import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
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
        <NavLink tag={Link} to={'/lodgings'}>
          <NavItem>
            <i className='fa faHome' /> Lodgings
          </NavItem>
        </NavLink>
        <NavLink tag={Link} to={'/experiences'}>
          <NavItem>
             <i className='fa faCamera' /> Experiences
          </NavItem>
        </NavLink>
        <NavLink tag={Link} to={'/cart'}>
          <NavItem>
             <i className='fa faHome' /> Cart
          </NavItem>
        </NavLink>
        <NavLink tag={Link} to={'/profile'}>
            <NavItem>
              <i className='fa faUser' /> Profile
            </NavItem>
         </NavLink>
         <NavLink tag={Link} to={'/fake'}>
            <NavItem>
              <i className='fa faHome'/> <span className="indicatorScreenSize">Admin</span>
            </NavItem>
         </NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
