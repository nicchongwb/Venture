import { useRouter } from "next/router";
import useSWR from 'swr'
import { fetchGetJSON } from '../utils/api-helpers'
import PrintObject from "../components/Layout/PrintObject";
import {useSession} from 'next-auth/react'
import {prisma} from "../lib/prisma"




export default function Result() {
    const router = useRouter();

    const {data: session, status} = useSession()

    const { data, error } = useSWR(
        router.query.session_id
          ? `/api/checkout_sessions/${router.query.session_id}`
          : null,
        fetchGetJSON
      )
      
    if (error) return <div>failed to load</div>

    return (
        <div>
            <h1>Checkout Payment Result</h1>
            <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
            <h3>CheckoutSession response:</h3>
            <PrintObject content={data ?? 'loading...'} />
        </div>
    )
}