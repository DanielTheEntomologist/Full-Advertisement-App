import { useState } from "react";
import { useSelector } from "react-redux";

import logo from "/src/assets/logoPlaceholder.png";
import Logo from "/src/components/common/Logo/Logo";
import { NavLink } from "react-router-dom";

import { loginStatus, loginName } from "/src/redux/auth.js";

import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const authStatus = useSelector(loginStatus);
  const userName = useSelector(loginName);

  const isAuthorized = authStatus === "authorized";

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  let userButton = null;
  let registerButton = null;
  let userNameButton = null;
  let logoutButton = null;

  if (!isAuthorized) {
    userButton = (
      <NavLink to="/login">
        <Button outline color="primary">
          Login
        </Button>
      </NavLink>
    );
    registerButton = (
      <NavLink to="/register">
        <Button outline color="primary">
          Register
        </Button>
      </NavLink>
    );
  }
  if (isAuthorized) {
    userNameButton = (
      <NavLink to="/profile">
        <Button outline color="primary">
          <FontAwesomeIcon icon={faUser} />
          <span> </span>
          {userName}
        </Button>
      </NavLink>
    );
    logoutButton = (
      <NavLink to="/logout">
        <Button outline color="primary">
          <FontAwesomeIcon icon={faPowerOff} /> Logout
        </Button>
      </NavLink>
    );
  }
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand src={logo}>
          <Logo src={logo} />
          AdMarket
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto align-items-center" navbar>
            <NavItem>
              <NavLink to="/ads" className="nav-link">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/ads" className="nav-link">
                Explore
              </NavLink>
            </NavItem>
            <NavItem>{userButton}</NavItem>
            <NavItem>{registerButton}</NavItem>
            <NavItem>{userNameButton}</NavItem>
            <NavItem>{logoutButton}</NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MainMenu;
