import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../public/logo.jpg';

function BasicExample() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="150"
                        height="40"
                        className="d-inline-block align-top"
                        alt="logo"
                    /></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/Five4Five">Five4Five</Nav.Link>
                        <Nav.Link href="/Head2Head">Head2Head</Nav.Link>
                        <Nav.Link href="/Explore">Explore</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;