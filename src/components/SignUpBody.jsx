"use client";

import { GlobalContext } from '@/context/GlobalProvider';
import { account } from '@/utils/appwrite';
import { ID } from 'appwrite';
import { useContext, useState } from 'react';

const SignUpPageBody = () => {
    const { login } = useContext(GlobalContext);

    /*
    * The input state
    * @type {Object}
    * @property {string} name - The name input field
    * @property {string} email - The email input field
    * @property {string} password - The password input field
    * @property {string} confirmPassword - The confirm password input field
    * 
    * @example
    * const [input, setInput] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    * 
     */
    const [input, setInput] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(true);

    /**
    * Clear the input field
    * @constructor
    * @param {Event} event - The event object
    **/
    function clearInput(event) {
        const iconButton = event.target;
        const textField = iconButton.parentElement;
        iconButton.blur();
        textField.value = '';
        textField.focus();
    }

    /**
     * Handle the name change
     * @constructor
     * @param {Event} event - The event object
     * */
    async function handleChange(event) {
        const { name, value } = event.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    }


    /**
     * Handle the form submission
     * @constructor
     * @param {Event} e - The event object
    **/
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submitting form');
        console.log(input);

        if (input.password !== input.confirmPassword || input.password.length < 8) {
            console.log('passwords do not match or password is less than 8 characters');
            return;
        }

        await account.create(ID.unique(), input.email, input.password, input.name).then(response => {
            console.log(response);
        }).catch(error => {
            console.error(error);
        });

        const result = await login(input.email, input.password);

        if (result) {
            console.log('logged in');
        } else {
            console.log('not logged in');
        }
    }

    async function toggleShowPassword() {
        setShowPassword(!showPassword);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={input.name} onChange={handleChange} autoComplete="name" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={input.email} onChange={handleChange} autoComplete="email" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type={showPassword ? "text" : "password"} className="form-control" id="password" name="password" value={input.password} onChange={handleChange} autoComplete="new-password" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type={showPassword ? "text" : "password"} className="form-control" id="confirmPassword" name="confirmPassword" value={input.confirmPassword} onChange={handleChange} required />
                </div>

                <div className="mb-3 form-check" >
                    <input type="checkbox" style={{ cursor: "pointer" }} className="form-check-input" id="showPassword" checked={showPassword} onChange={toggleShowPassword} />
                    <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor="showPassword">
                        Show Password
                    </label>
                </div>

                <md-filled-button type="submit">
                    Signup
                </md-filled-button>

            </form >
        </>)
}

export default SignUpPageBody
