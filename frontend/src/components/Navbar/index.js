import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import PropTypes from "prop-types";

import logo from './logo.png';

export default function Header(props) {
  return (
    <div>
      <Navbar color="faded" light>
        <img src={logo} style={{width: '4.3rem'}} alt=''/>
        <NavbarToggler onClick={props.handleDrawerToggle} className="mr-2" />
        <Collapse isOpen={props.open} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="http://127.0.0.1:8000/admin">Admin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/admin/home">Home</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

Header.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  handleDrawerToggle: PropTypes.func,
  open: PropTypes.bool,
};
