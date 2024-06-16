"use client";

import Head from 'next/head'
import React from 'react'
import SignUpPageBody from '@/components/SignUpBody'
import Navbar from '@/components/Navbar';

export default function Signup() {
    return (
        <>
            <Head>
                <title>Signup</title>
                <meta name="description" content="Signup Page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main className="container my-3">
                <SignUpPageBody />
            </main>
        </>
    )
}

