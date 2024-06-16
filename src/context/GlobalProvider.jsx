import { account } from '@/utils/appwrite';
import { createContext, useState } from 'react';

const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    /*
    * Login the user
    * @constructor
    * @param {string} email - The email address
    * @param {string} password - The password
    * @returns {Object} The user object
     */
    async function login(email, password) {
        let user = await fetchUser();
        if (user) return user;
        log("user is not already logged in");

        let result;
        try {
            result = await account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error(error);
            return Promise.reject(false);
        }

        console.log("getting user");

        user = await fetchUser();
        if (!user) return false;
        setUser(user);
        console.log("setting user in localstorage");
        localStorage.setItem('user', JSON.stringify(user));

        return Promise.resolve(user);
    }

    async function fetchUser() {
        let user;

        try {
            user = await account.get();
            return user;
        } catch (error) {
            console.error(error);
            console.log("user not logged in...");
            return false;
        }

        return Promise.resolve(user);
    }

    async function logout() {
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error(error);
        }
        localStorage.removeItem('user');
        return Promise.resolve(true);
    }

    async function getUser() {
        // first get the user from localstorage and set it to the state
        // then get the user from the server and update the state
        let user = localStorage.getItem('user') || null;
        if (user) {
            setUser(JSON.parse(user));
        }

        fetchUser().then(res => {
            console.log("fetching user from server");
            if (res) {
                setUser(res);
                localStorage.setItem('user', JSON.stringify(res));
            }
            else {
                setUser(null);
                localStorage.removeItem('user');
            }
        });
    }

    return (
        <GlobalContext.Provider value={{ user, setUser, login, logout, getUser }}>
            {children}
        </GlobalContext.Provider>
    );
};

function log(message, color = 'cyan') {
    console.log(`%c${message}`, `color: ${color}; font-size:16px;`);
}

export { GlobalContext, GlobalProvider };
