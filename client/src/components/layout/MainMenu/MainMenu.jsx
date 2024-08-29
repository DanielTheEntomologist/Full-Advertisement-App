import { useState } from "react";
import logo from "/src/assets/logoPlaceholder.png";
import Logo from "/src/components/common/Logo/Logo";

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <Logo src={logo} />
          AdMarket
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto align-items-center" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/ads">Explore</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">
                <Button outline color="primary">
                  Login
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register">
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
