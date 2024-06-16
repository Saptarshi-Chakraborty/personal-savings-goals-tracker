"use client";

import Head from 'next/head'
import React, { useContext, useLayoutEffect } from 'react'
import SignUpPageBody from '@/components/SignUpBody'
import Navbar from '@/components/Navbar';
import { GlobalContext } from '@/context/GlobalProvider';
import { useRouter } from 'next/router';

export default function Signup() {
    const { user } = useContext(GlobalContext);
    const router = useRouter();

    useLayoutEffect(() => {
        if (user) {
            router.push('/my-goals/');
        }
    }, [user, router]);


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

