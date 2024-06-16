import MyGoalsPageBody from '@/components/MyGoalsBody'
import Navbar from '@/components/Navbar'
import { GlobalContext } from '@/context/GlobalProvider'
import Head from 'next/head'
import React, { useContext } from 'react'

const MyGoals = () => {
    const {user} = useContext(GlobalContext)
    return (
        <>
            <Head>
                <title>My Goals</title>
            </Head>
            <Navbar />
            {
                user?
                <MyGoalsPageBody />
                :
                <div className="alert alert-danger my-4 mx-2" role="alert">
                You need to be <a href="/login" className="alert-link">logged in</a> to view your goals.
            </div>
            }
        </>
    )
}

export default MyGoals
