import React from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import {useSession, signOut, signIn} from 'next-auth/react'

export const APP_BAR_HEIGHT = "4.5rem";
const Navigationbar = () => {
    var logined  = false
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
      router.pathname === pathname;

    const {data: session, status} = useSession()
    let navButtons = null;

    if (status === 'loading') {
      navButtons = (
        <>
        <p>Validating session...</p>
        </>
      )
    }

    if(!session) {
      navButtons = (
        <div>
          <Link href="/api/auth/signin">
            <button>
              <a>Log in</a>
            </button>
          </Link>
        </div>
      )
    } 

    if(session){
      logined = true
      navButtons = (
        <div>
          <p>
            {session.user.name} ({session.user.email})
          </p>

        <Button onClick={()=>signOut()} variant="secondary">Logout</Button>
        <Button href="/"  variant="secondary">Portfolio</Button>
        </div>
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
            {logined && <Link href="/raise">Raise</Link>}
            <Link href="/">About Us</Link>
          </Nav>
            {navButtons}
          </Navbar.Collapse>
      </Navbar>
    </Container>
    );
  }


export default Navigationbar;