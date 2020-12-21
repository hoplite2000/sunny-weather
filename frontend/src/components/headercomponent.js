import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {

    return (
        <header>
            <Navbar bg="primary" variant="light" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand><span><img src={window.location.origin + "/logo.png"} alt="logo" className="logo" /></span> Sunny Weather</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ml-auto'>
                            <a href="https://github.com/nehal2000/sunny-weather"><span className="fas fa-building nav-mar"></span> <div style={{ fontSize: '15px', color: 'black' }}>View Github</div></a>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    );
}

export default Header;