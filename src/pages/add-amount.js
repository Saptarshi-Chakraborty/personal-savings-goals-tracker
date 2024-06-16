import AddAmountPageBody from '@/components/AddAmount';
import Navbar from '@/components/Navbar';
import { GlobalContext } from '@/context/GlobalProvider';
import Head from 'next/head';
import { useContext } from 'react';

const AddAmount = () => {
    const { user } = useContext(GlobalContext);
    return (
        <>
            <Head>
                <title>Add Amount | Personal Savings Goals</title>
            </Head>
            <Navbar />
            {
                user ? <AddAmountPageBody />
                    :
                    <div className="alert alert-danger my-4 mx-2" role="alert">
                        You need to be <a href="/login" className="alert-link">logged in</a> to add amount.
                    </div>

            }
        </>
    )
}

export default AddAmount
