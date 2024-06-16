import Navbar from '@/components/Navbar'
import Head from 'next/head'
import React from 'react'

const MyTransaction = () => {
    return (
        <>
            <Head>
                <title>My Transactions</title>
            </Head>
            <Navbar />

            
            <main className="container my-3">
                <h1>My Transactions</h1>
                <p>comming soon...</p>
            </main>
        </>
    )
}

export default MyTransaction
