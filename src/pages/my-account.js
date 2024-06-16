import Navbar from '@/components/Navbar'
import { GlobalContext } from '@/context/GlobalProvider';
import { avatars } from '@/utils/appwrite';
import timesAgo from '@/utils/times-ago';
import Head from 'next/head'
import Link from 'next/link';
import React, { useContext } from 'react'

const MyAccount = () => {
    const { user, logout } = useContext(GlobalContext);

    console.log(user)

    async function getNumberOfGoals() {

    }

    return (
        <>
            <Head>
                <title>My Account</title>
            </Head>
            <Navbar />

            {
                user ?
                    <main className="container my-3" >
                        <h1>My Account</h1>
                        <div className="card flex flex-md-row flex-column justify-content-center my-3">

                            <img src={avatars.getInitials()} min-="200px" width="200px" className="mx-auto mt-3 mt-md-0" alt="..." />

                            <div className="card-body">
                                <p className="card-text mb-1 fs-5"><small className="text-muted">name: </small> {user.name}</p>
                                <p className="card-text mb-1 fs-5"><small className="text-muted">email: </small> {user.email}</p>
                                <p className="card-text mb-1 fs-5">
                                    <small className="text-muted">role: </small>
                                    {
                                        user.labels && user.labels.length > 0 && user.labels.includes('admin') ?
                                            <span className="badge bg-primary rounded-pill">
                                                admin
                                            </span>
                                            :
                                            <span className="badge bg-secondary rounded-pill">
                                                user
                                            </span>
                                    }
                                </p>
                                <p className="card-text mb-1 fs-5"><small className="text-muted">account created on: </small> {new Date(user.$createdAt).toLocaleString()}</p>
                                <p className="card-text mb-1 fs-5"><small className="text-muted">last logged in: </small> {timesAgo(user.accessedAt)}</p>
                            </div>
                        </div>


                        <button className="btn btn-outline-danger mt-3 mb-5 fs-5 fw-semibold w-100 rounded-end-pill rounded-start-pill" onClick={logout}>Logout</button>

                    </main>
                    :
                    <div className="container my-3">
                        <h1>My Account</h1>
                        <p>You need to <Link href="/login/">login</Link> to view this page</p>
                    </div>
            }
        </>
    )
}

export default MyAccount
