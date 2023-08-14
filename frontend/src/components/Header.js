import React, { useContext } from "react";
import { Badge, Button, Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { Store } from "../Store";

const Header = (props) => {
    let {sidebarIsOpen,setSidebarIsOpen} = props;
     const { state, dispatch: ctxDispatch } = useContext(Store);
     const { fullBox, cart, userInfo } = state;
     const signoutHandler = () => {
        ctxDispatch({ type: "USER_SIGNOUT" });
        localStorage.removeItem("userInfo");
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("paymentMethod");
        window.location.href = "/signin";
      };
  return (
    <>
    <header className="bg-dark py-3 " style={{borderBottom:"0.1px solid #707070"}}>
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over $100 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8865953659">
                  +91 8865953659
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-3">
        <Container>
          <Button
            variant="dark"
            onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
            style={{fontSize:"1.5rem"
            }}
          >
            <i className="fas fa-bars"></i>
          </Button>

          <LinkContainer to="/" style={{fontSize:"2rem"}}>
            <Navbar.Brand className="px-4" >amazona</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="me-auto  w-100  justify-content-end">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link
                    className="dropdown-item"
                    to="#signout"
                    onClick={signoutHandler}
                  >
                    Sign Out
                  </Link>
                </NavDropdown>
              ) : (
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header></>
  );
};

export default Header;
