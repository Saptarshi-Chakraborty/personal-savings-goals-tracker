import { IconPlusBoxOutline } from '@/assets/icons';
import { GlobalContext } from '@/context/GlobalProvider';
import { Query, database, databaseId, goalCollectionId } from '@/utils/appwrite';
import Link from 'next/link';
import React, { useContext, useEffect } from 'react'
import { ProgressBar } from 'react-bootstrap';

const MyGoalsPageBody = () => {
    const { user } = useContext(GlobalContext);
    const [goals, setGoals] = React.useState([]);
    const [hasFetched, setHasFetched] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    async function fetchMyGoals() {
        setLoading(true);
        try {
            const result = await database.listDocuments(
                databaseId,
                goalCollectionId,
                [
                    Query.equal("userId", user.$id)
                ]
            )
            console.log(result);
            setGoals(result.documents);
            setHasFetched(true);

        } catch (error) {
            console.error(error)
            alert("An error occurred while fetching goals")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            fetchMyGoals()
        }
    }, [user])

    return (
        <main className="container my-3">
            <div className="d-flex flex-row flex-wrap justify-content-between align-items-center">
                <h1 className="d-inline">My Goals</h1>
                <Link className="link-dark link-offset-2 link-underline-opacity-50 link-underline-opacity-100-hover fs-5" href="/add-amount/"><IconPlusBoxOutline className="fs-4 fw-light" />
                    <span className="ms-1">Add Amount</span></Link>
            </div>

            {loading && <div className="text-center">Loading...</div>}
            {(goals.length === 0 && !loading && hasFetched) &&
                <div className="text-center fs-5 mt-3">
                    <p className="mb-0">No goal found</p>
                    <p><Link href="/add-goal/">Add a goal</Link> to view here</p>
                </div>
            }

            {
                (goals.length > 0 && hasFetched) &&
                goals.map((goal) => {
                    const percentage = goal?.currentAmount * 100 / goal?.targetAmount
                    const progressLabel = `${goal?.currentAmount} / ${goal?.targetAmount}`

                    return (
                        <div key={goal.$id} className="card my-3">
                            <div className="card-body py-2">
                                <h5 className="card-title">{goal.name}</h5>
                                <pre className="card-text text-small mt-0 mb-0">{goal?.description}</pre>
                                <p>
                                    <small className="text-dark border-2 border-dark border-bottom fst-italic">Saved :</small>
                                    {" "}
                                    <span >{goal.currentAmount} / {goal?.targetAmount} Rs. ({parseInt(percentage)} %) </span>
                                </p>

                                <ProgressBar min={0} max={100} now={percentage} className="text-danger" />

                            </div>
                        </div>
                    )
                }
                )
            }

            {
                (goals.length > 0 && hasFetched) &&
                <p className="mt-3">
                    View all your <Link href="/my-transactions/">transactions</Link>
                </p>
            }

        </main>
    )
}

export default MyGoalsPageBody
