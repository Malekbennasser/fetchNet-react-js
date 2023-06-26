import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import { useState } from "react";

import { Link } from "react-router-dom";

export default function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const clearStorage = () => {
    localStorage.clear();
  };

  return (
    <>
      <MDBNavbar dark bgColor="primary">
        <MDBContainer fluid>
          <MDBNavbarBrand href="/">
            <img
              src="https://cdn.discordapp.com/attachments/1094943516251127858/1111236887760347136/test-fotor-bg-remover-20230525121825.png"
              height="30"
              alt=""
              loading="lazy"
            />
            FetchNet
          </MDBNavbarBrand>
          <nav aria-label="breadcrumb">
            <MDBBreadcrumb>
              <MDBBreadcrumbItem>
                <Link to="/" className="text-light">
                  Home
                </Link>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                {token != null ? (
                  <Link
                    className="text-light"
                    to="/Login"
                    onClick={clearStorage}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link className="text-light" to="/Login">
                    Login
                  </Link>
                )}
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                {token != null ? (
                  <Link className="text-light" to="/Profile">
                    Welcome {localStorage.getItem("firstname")}
                  </Link>
                ) : (
                  <Link className="text-light" to="/Register">
                    Register
                  </Link>
                )}
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </nav>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}
