import AddGoalsPageBody from '@/components/AddGoals';
import Navbar from '@/components/Navbar'
import { GlobalContext } from '@/context/GlobalProvider';
import Head from 'next/head'
import React, { useContext } from 'react'

const AddGoal = () => {
    const { user } = useContext(GlobalContext);
    return (
        <>
            <Head>
                <title>Add Goal</title>
            </Head>
            <Navbar />

            {
                user ? <AddGoalsPageBody />
                    :
                    <div className="alert alert-danger my-4 mx-2" role="alert">
                        You need to be <a href="/login" className="alert-link">logged in</a> to add a goal.
                    </div>

            }

        </>
    )
}

export default AddGoal
