/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

import { Navbar, NavbarBrand, Container } from "reactstrap";

const Header = () => {
  return (
    <Navbar
      color="transparent"
      expand="lg"
      className="navbar-absolute fixed-top navbar-transparent"
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <NavbarBrand href="/">
            Site Sonar - WLCG Configuration Monitoring Tool
          </NavbarBrand>
        </div>
      </Container>
    </Navbar>
  );
};
export default Header;
