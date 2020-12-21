import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {

    return (
        <header>
            <Navbar bg="primary" variant="light" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand><span><img src={window.location.origin + "/logo.png"} alt="logo" className="logo" /></span> Weather App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ml-auto'>
                            <LinkContainer to="/"><Nav.Link><span className="fas fa-building nav-mar"></span> <div style={{ fontSize: '15px' }}>View Github</div></Nav.Link></LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    );
}

export default Header;