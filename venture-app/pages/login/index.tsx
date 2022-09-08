import React from 'react'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from 'next-auth/react'

const LoginIndex = () => {
    const {data: session, status} = useSession()

    if(session) {
        return(
            <div>Logged in as {session.user.email}</div>
        )
    }

    return (
        <div><h1>login page</h1>login page</div>
    )
}

export default LoginIndex