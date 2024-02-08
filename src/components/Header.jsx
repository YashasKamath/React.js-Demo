import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Header() {
  const [openBasic, setOpenBasic] = useState(false);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!token) return;
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  function handleItemClick(event) {
    event.preventDefault();
  }

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">Biogas</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/">About</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="nav-link" role="button">
                  Products
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem link={handleItemClick}>
                    Biogas
                  </MDBDropdownItem>
                  <MDBDropdownItem link={handleItemClick}>CNG</MDBDropdownItem>
                  <MDBDropdownItem link={handleItemClick}>LPG</MDBDropdownItem>
                  <MDBDropdownItem link={handleItemClick}>
                    Kerosene
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href="/">Contact Us</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>

          <form className="d-flex input-group w-auto" style={{"margin-right":"5px"}}>
            <input
              type="search"
              className="form-control"
              placeholder="Type query"
              aria-label="Search"
            />
            <MDBBtn color="primary">Search</MDBBtn>
          </form>

          {/* {token && (
            <MDBNavbarItem>
              <button
              type="submit"
              class="btn btn-primary"
              data-mdb-ripple-init
              onClick={handleLogout}
            >
              Log Out
            </button>
            </MDBNavbarItem>
          )} */}
          <div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav ms-auto">
    <li class="nav-item">
      <button
          type="submit"
          class="btn btn-primary"
          data-mdb-ripple-init
          onClick={handleLogout}
          style={{"white-space": "nowrap"}}
        >
          Log Out
          <i class="fas fa-sign-out-alt" style={{"margin-left": "5px"}}></i>
      </button>
    </li>
  </ul>
</div>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;
