import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import * as authService from '../../services/authService';
import { useContext } from "react";


function Navigation() {
  const navigate = useNavigate();
  const { user, userLogout } = useContext(AuthContext);

  const onClick = (e) => {
    e.preventDefault();
    authService.logout(user.token, user.user.userName)
      .then(() => {
        toast.success("You were successfully logged out!", { autoClose: 1000 })
        userLogout();
        navigate('/login');
      })
      .catch(() => {
        toast.error("Something went wrong!", { autoClose: 1000 })
        navigate('/');
      });
  }

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand to="/" as={Link}>Rent A Car</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link to="/catalog" as={Link}>Catalog</Nav.Link>
            {user.token
              ? <div id="user"> {!user.user.renterId ? <Nav>
                <NavDropdown title="Car" id="basic-nav-dropdown">
                  <NavDropdown.Item to="/create" as={Link}>Add car</NavDropdown.Item>
                  <NavDropdown.Item to="/my-cars" as={Link}>
                    My cars
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link to="/my-profile" as={Link}>My profile</Nav.Link></Nav>
                : <Nav>  <Nav.Link to="/my-bookings" as={Link}>My bookings</Nav.Link>
                  <Nav.Link to="/my-profile" as={Link}>My profile</Nav.Link></Nav>}</div>
              : <Nav><Nav.Link to="/login" as={Link}>Login</Nav.Link>
                <NavDropdown title="Register" id="basic-nav-dropdown">
                  <NavDropdown.Item to="/register-renter" as={Link}>Register Renter</NavDropdown.Item>
                  <NavDropdown.Item to="/register-dealer" as={Link}>
                    Register Dealer
                  </NavDropdown.Item>
                </NavDropdown></Nav>}
          </Nav>
          {user.token && <Nav><Navbar.Text>Welcome, {user.user.userName}!</Navbar.Text>
            <Nav.Link href="/logout" onClick={onClick}>Sign out</Nav.Link>
          </Nav>
          }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;