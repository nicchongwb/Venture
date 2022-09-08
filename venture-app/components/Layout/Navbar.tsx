import React from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {useSession, signOut, signIn} from 'next-auth/react'

export const APP_BAR_HEIGHT = "4.5rem";
const Navigationbar = () => {
    //const { pathname } = useRouter();

    const {data: session, status} = useSession()
    let navButtons = null;
    if(session) {
      navButtons = (
        <>
        <Button href="/" onClick={()=>signOut()} variant="secondary">Logout</Button>
        <Button href="/"  variant="secondary">Portfolio</Button>
        </>
      )
    } else {
      navButtons = (
        <>
        <Button href="/api/auth/signin" onClick={()=>signIn()} variant="secondary">Login</Button>
        <Button href="/signup"  variant="dark">Sign Up</Button>
        </>
      )
    }

    return (
    <Container fluid>
       <Navbar bg="light" expand="xxl">
        <Navbar.Brand href="/">VENTURE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/invest">Invest</Link>
            <Link href="/raise">Raise</Link>
            <Link href="/">About Us</Link>
          </Nav>
            {navButtons}
          </Navbar.Collapse>
      </Navbar>
    </Container>
    );
  }


export default Navigationbar;