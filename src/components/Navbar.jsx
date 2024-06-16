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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/signup/">Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/login/">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/add-goal/">Add Goal</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/add-amount/">Add Amount</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" >
                                {user ? 'Welcome, ' + `${user.name}` : 'Not logged In'}
                            </a>
                        </li>
                    </ul>
                    <div>
                        {
                            user ? (
                                <div>
                                    <span>{user.email}</span>
                                    <button className="btn btn-sm btn-danger" onClick={logout}>Sign Out</button>
                                </div>
                            ) : (
                                <div>
                                    <button onClick={() => account.createEmailPasswordSession(' ', ' ')}>Sign In</button>

                                    <button onClick={() => account.createEmailPasswordSession(' ', ' ')}>Sign Up</button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
