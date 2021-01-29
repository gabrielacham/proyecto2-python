import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import PropTypes from "prop-types";

export default function Header(props) {
  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">Pedidos</NavbarBrand>
        <NavbarToggler onClick={props.handleDrawerToggle} className="mr-2" />
        <Collapse isOpen={props.open} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/admin/login">Login</NavLink>
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
