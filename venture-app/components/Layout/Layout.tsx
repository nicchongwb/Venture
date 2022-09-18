import React, { ReactElement } from 'react'
import Navigationbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}: {children: ReactElement}) => {
    return (
        <>
        <body className="flex flex-col min-h-screen">
            <Navigationbar />
                <main>{children}</main>
            <Footer />

        </body>
            
        </>
    )
}

export default Layout