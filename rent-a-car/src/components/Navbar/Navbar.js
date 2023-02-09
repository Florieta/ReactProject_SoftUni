import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand to="/" as={Link}>Rent A Car</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link to="/catalog" as={Link}>Catalog</Nav.Link>
            <Nav.Link to="/login" as={Link}>Login</Nav.Link>
            <NavDropdown title="Register" id="basic-nav-dropdown">
              <NavDropdown.Item to="/register-renter" as={Link}>Register Renter</NavDropdown.Item>
              <NavDropdown.Item to="/register-dealer" as={Link}>
                Register Dealer
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/logout">Sign out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;