import React, { useState } from 'react';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';



import { useRouter } from 'next/router';
import {useSession, signOut, signIn} from 'next-auth/react'

export const APP_BAR_HEIGHT = "4.5rem";
const Navigationbar = () => {
    var logined  = false
    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
      router.pathname === pathname;

    const {data: session, status} = useSession()
    let smallnavButtons = null;
    let bignavButtons = null;
    let bignavName = null;

    if (status === 'loading') {
      smallnavButtons = (
        <>
        <p>Validating session...</p>
        </>
      )
    }

    if (status === 'loading') {
      bignavButtons = (
        <>
        <p>Validating session...</p>
        </>
      )
    }

    if(!session) {
      smallnavButtons = (
        <div>
          <Link href="/api/auth/signin">
          <button  className='bg-transparent text-indigo-600 px-8 py-3 mb-4'>Log In</button>
          </Link>
        </div>
      )
    } 

    if(!session) {
      bignavButtons = (
        <div>
          <Link href="/api/auth/signin">
          <button className='px-8 py-3'> Log In</button>
          </Link>
        </div>
      )
    } 

    if(session){
      logined = true
      smallnavButtons = (
        <div>
          <p>
            Hello!<br/>
            {session.user.name} ({session.user.email})
          </p>
        <button onClick={()=>signOut()} className='bg-transparent text-indigo-600 px-8 py-3 mb-4'>Sign Out</button>
        <button  className='px-8 py-3'><a className='text-white no-underline' href='/portfolio'>Portfolio</a></button>
        </div>
      )
    }

    if(session){
      logined = true
      bignavButtons = (
        <div>
          <button onClick={()=>signOut()} className='border-none bg-transparent text-black mr-4'>Sign Out</button>
          <button className='px-8 py-3'><a className='text-white no-underline' href='/portfolio'>Portfolio</a></button>
        </div>
        
      )
    }
    if(session){
      logined = true
      bignavName = (
        <div className='pl-8'>
          <p>
              Welcome: 
              { session.user.name} ({session.user.email})
            </p>
        </div>
        
      )
    }

    

    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    const handleClose =()=> setNav(!nav)

    return (
      <div className='w-screen h-[80px] z-10 bg-zinc-200  drop-shadow-lg'>
      <div className='px-2 flex justify-between items-center w-full h-full'>
        <div className='flex items-center'>
          <h1 className='text-3xl font-bold mr-4 sm:text-4xl'><a className='pl-6 text-black mr-4 no-underline'href='/'>VENTURE.</a></h1>
          <ul className='hidden md:flex'>
       
          <li><Link href="/"  >Home</Link></li>
         {session?.user &&<li><Link href="/raise" >Raise</Link></li> }
          <li><Link href="/invest" >Invest</Link></li>
          <li >{bignavName}</li>
          </ul>
     
        </div>
        <div className='hidden md:flex pr-4'>
        {bignavButtons}
         
        </div>
        <div className='md:hidden mr-4' onClick={handleClick}>
            {!nav ? <MenuIcon className='w-5' /> : <CloseIcon className='w-5' />}
          
        </div>
      </div>

      <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
          <li className='border-b-2 border-zinc-300 w-full'><Link  href="/" ><a onClick={handleClose}> Home</a></Link></li>
          {session?.user &&<li className='border-b-2 border-zinc-300 w-full'><Link href="/raise" ><a onClick={handleClose}> Raise</a></Link></li>}
          <li className='border-b-2 border-zinc-300 w-full'><Link href="/invest"><a onClick={handleClose}> Invest</a></Link></li>
        <div className='flex flex-col my-4'>
            {smallnavButtons}
        </div>
      </ul>

      <h1>
     
      </h1>
    </div>
    
   
    
    );
  }


export default Navigationbar;