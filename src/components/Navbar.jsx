import { GlobalContext } from '@/context/GlobalProvider';
import { account } from '@/utils/appwrite';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useLayoutEffect } from 'react';

const Navbar = () => {
    const { user, logout, getUser } = useContext(GlobalContext);

    useEffect(() => {
        if (!user)
            getUser();
    }, [user])


    return (
        <nav className="navbar navbar-expand-lg" data-bs-theme="light">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="/">Savings Tracker</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {
                            user && <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/my-goals/">My Goals</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/add-goal/">Add Goal</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/add-amount/">Add Amount</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" href="/my-account/">My Account</Link>
                                </li>
                            </>}

                        {
                            user && user.labels && user.labels.length > 0 && user.labels.includes('admin') &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Admin
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">View All Goals</a></li>
                                    <li><a className="dropdown-item" href="#">View All Transactions</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </li>
                        }

                    </ul>
                    <div>
                        {
                            user ? (
                                <button className="btn btn-sm btn-danger" onClick={logout}>Logout</button>
                            ) : (
                                <>
                                    <Link className="btn btn-primary" href="/login">Login</Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar
