import Navbar from '@/components/Navbar'
import { GlobalContext } from '@/context/GlobalProvider'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useContext, useLayoutEffect, useState } from 'react'

const Login = () => {
    const { user, login } = useContext(GlobalContext)
    const router = useRouter()

    const [input, setInput] = useState({ email: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    async function handleChange(e) {
        const { name, value } = e.target
        setInput(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log(input)

        setLoading(true)

        try {
            const result = await login(input.email, input.password)
            console.log(result)

            if (!result) {
                alert("Login failed")
                throw new Error("Login failed")
            }

            setInput({ email: '', password: '' })
            alert("Login successful")
            router.push('/my-goals/')
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    useLayoutEffect(() => {
        if (user) {
            router.push('/my-goals/')
        }
    }, [user])

    return (
        <>
            <Head>
                <title >Login</title>
            </Head>
            <Navbar />
            <main className="container">
                <h1 className="text-center">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input value={input.email} onChange={handleChange} name="email" type="email" className="form-control" id="email" aria-describedby="emailHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input value={input.password} onChange={handleChange} name="password" type={showPassword ? "text" : "password"} className="form-control" id="password" required />
                    </div>
                    <div className="mb-3 form-check" >
                        <input type="checkbox" style={{ cursor: "pointer" }} className="form-check-input" id="showPassword" checked={showPassword} onChange={toggleShowPassword} />
                        <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor="showPassword">
                            Show Password
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

                <div className="mt-3">
                    <p>Don't have an account? <a href="/signup/">Register here</a></p>
                </div>

            </main>
        </>
    )
}

export default Login
