import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <style>
        {`
          .transparent-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
        `}
      </style>

      <Navbar
        expand="lg"
        className="px-3"
        style={{
          zIndex: 2,
          paddingBottom : "4rem"
        }}
      >
        <Container fluid className="d-flex justify-content-between align-items-center">
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4" style={{ color: "white" }}>
            🎬 RheoFlix
          </Navbar.Brand>
          <Form className="d-flex flex-grow-1 justify-content-center mx-3" style={{ maxWidth: "600px" }}>
            <Form.Control
              type="search"
              placeholder="Search for a movie..."
              className="me-2 w-75 transparent-input"
              aria-label="Search"
              style={{
                backgroundColor: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                color: "white",
                backdropFilter: "blur(5px)",
              }}
            />
            <Button variant="outline-light">Search</Button>
          </Form>
          {isAuthenticated ? (
            <Button variant="outline-danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login"><Button variant="outline-light">Login</Button></Link>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
