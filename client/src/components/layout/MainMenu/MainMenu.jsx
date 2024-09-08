import { useState } from "react";
import logo from "/src/assets/logoPlaceholder.png";
import Logo from "/src/components/common/Logo/Logo";
import { NavLink } from "react-router-dom";

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

<NavLink to="/register" className="nav-link">
  Don't have an account? Register
</NavLink>;

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavLink to="/">
          <NavbarBrand>
            <Logo src={logo} />
            AdMarket
          </NavbarBrand>
        </NavLink>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto align-items-center" navbar>
            <NavItem>
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/ads" className="nav-link">
                Explore
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login">
                <Button outline color="primary">
                  Login
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/register">
                <Button outline color="primary">
                  Register
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainMenu;
