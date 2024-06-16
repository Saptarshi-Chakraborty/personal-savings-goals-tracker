import { GlobalContext } from '@/context/GlobalProvider';
import { ID, Permission, Role, database, databaseId, goalCollectionId } from '@/utils/appwrite';
import React, { useContext, useState } from 'react'

const AddGoalsPageBody = () => {
  const { user } = useContext(GlobalContext);
  const [input, setInput] = useState({ name: "", amount: "", description: "" });

  async function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(input);

    try {
      const result = await database.createDocument(
        databaseId,
        goalCollectionId,
        ID.unique(),
        {
          name: input.name,
          targetAmount: parseFloat(input.amount),
          description: input.description,
          userId: user.$id,
        },
        [
          Permission.read(Role.user(user.$id)), // Curent User can read this document
          Permission.update(Role.user(user.$id)), // Curent User can update this document
        ]
      )

      alert("Goal added successfully");
      setInput({ name: "", amount: "", description: "" });
      
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the goal");
    }
  }

  return (
    <main className="container my-3">
      <h1>Add a goal</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name of your goal</label>
          <input value={input.name} onChange={handleChange} name="name" type="text" className="form-control" id="name" aria-describedby="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount needed</label>
          <div className="input-group">
            <span className="input-group-text">Rs.</span>
            <input value={input.amount} onChange={handleChange} name="amount" inputMode="decimal" type="text" className="form-control" id="amount" aria-describedby="amount" required />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description <span className="text-muted">(optional)</span></label>
          <textarea value={input.description} onChange={handleChange} name="description" className="form-control" id="description" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </main>
  )
}

export default AddGoalsPageBody
