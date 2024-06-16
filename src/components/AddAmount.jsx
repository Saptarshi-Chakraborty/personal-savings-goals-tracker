import { GlobalContext } from '@/context/GlobalProvider';
import { ID, Permission, Query, Role, database, databaseId, goalCollectionId, transactionCollectionId } from '@/utils/appwrite';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';

const AddAmountPageBody = () => {
    const { user } = useContext(GlobalContext);

    const [input, setInput] = useState({ "amount": "", goalId: "", note: "" })
    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(true);
    const [goal, setGoal] = useState(null);

    async function fetchAllGoals() {
        setLoading(true)
        try {
            const result = await database.listDocuments(
                databaseId,
                goalCollectionId,
                [
                    Query.select(["$id", "name", "currentAmount", "targetAmount"]),
                    Query.equal("userId", user.$id),
                    Query.isNull("completedAt"),
                    Query.isNull("deletedAt"),
                    Query.orderDesc("$createdAt")
                ]
            )
            console.log(result)
            setGoals(result.documents)

        } catch (e) {
            console.log(e);
            alert("An error occured while fetching goals")
        }
        finally {
            setLoading(false)
        }
    }

    async function handleChange(e) {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(input)

        if (!input.goalId) {
            alert("Please select a goal")
            return;
        }

        const amount = parseFloat(input.amount)
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount")
            return false;
        }

        if (goal.currentAmount + amount > goal.targetAmount) {
            alert(`Amount exceeds the target amount.\nMaximum: ${(goal.targetAmount - goal.currentAmount)} Rs. can be added`)
            return false;
        }

        setLoading(true)
        try {
            const payload = {
                amount,
                goals: input.goalId,
                userId: user.$id,
                note: input.note,
                typeOfTransaction: "add"
            }
            console.log(payload)

            const result = await database.createDocument(
                databaseId,
                transactionCollectionId,
                ID.unique(),
                payload,
                [
                    Permission.read(Role.users()),
                ]
            )
            console.log(result)

        } catch (e) {
            console.log(e);
            alert("An error occured while adding amount");
            setLoading(false)
            return;
        }

        try {
            let payload = {
                currentAmount: parseFloat(goal.currentAmount) + parseFloat(amount)
            };

            const result = await database.updateDocument(
                databaseId,
                goalCollectionId,
                input.goalId,
                payload,
            )
            console.log(result)

            fetchAllGoals();
            setInput({ "amount": "", goalId: "", note: "" })

            alert("Amount added successfully")
        } catch (e) {
            console.log(e);
            alert("An error occured while updating goal")
            return;

        } finally {
            setLoading(false)
        }
    }

    useLayoutEffect(() => {
        if (goals.length === 0)
            fetchAllGoals()
    }, [])

    useEffect(() => {
        if (input.goalId && goals.length > 0) {
            const goal = goals.find(goal => goal.$id === input.goalId)
            setGoal(goal)
        } else {
            setGoal(null)
        }
    }, [input.goalId])


    return (
        <main className="container">
            <h1>Log your saving</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="goal" className="form-label">Select Goal</label>
                    <select value={input.goalId} onChange={handleChange} name="goalId" className="form-select" id="goal" disabled={loading}>
                        <option value="" disabled>Select Goal</option>
                        {goals.map(goal => (
                            <option key={goal.$id} value={goal.$id}>{goal.name}</option>
                        ))}
                    </select>
                    <p className="mt-1 text-muted">Don't see your goal? <a href="/add-goal">Add a new goal</a></p>
                </div>
                <div className="mb-1">
                    <label htmlFor="amount" className="form-label">Add money (Rs.)</label>
                    <input value={input.amount} onChange={handleChange} name="amount" min={0} type="text" inputMode="decimal" className="form-control" id="amount" placeholder="Enter the amount added for this goal" disabled={loading} />
                </div>

                {
                    goal &&
                    <p className="mb-3">
                        Already achived: {goal?.currentAmount} / {goal?.targetAmount} Rs.
                    </p>
                }

                <div className="mb-3">
                    <label htmlFor="note" className="form-label">Note <span className='text-muted'>(optional)</span></label>
                    <textarea value={input.note} onChange={handleChange} name="note" className="form-control" id="note" rows="3" placeholder="Write a short note about this amount" disabled={loading} ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add amount</button>
                {loading && <p className="text-muted mt-2">Loading...</p>}
            </form>
        </main>
    )
}

export default AddAmountPageBody
