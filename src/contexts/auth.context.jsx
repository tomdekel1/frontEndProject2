import { createContext, useContext, useState } from "react";
import usersService, { createUser } from "../services/usersService";

const fn_error_context_must_be_used = () => {
    throw new Error("must use authcontext provider for consumer to work")
}


export const authContext = createContext({
    user: null,
    login: fn_error_context_must_be_used,
    logout: fn_error_context_must_be_used,
    signUp: fn_error_context_must_be_used,
})

export function useAuth() {
    return useContext(authContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(usersService.getUser())

    const refreshUser = () => setUser(usersService.getUser());

    const login = async (logindetails) => {
        const response = await usersService.loginUser(logindetails);
        refreshUser();

        return response;
    }

    const logout = () => {
        usersService.logout();
        refreshUser();
    }

    return (
        <authContext.Provider value={{ user, login, logout, signUp: usersService.createUser, }} >
            {children}
        </authContext.Provider>
    );
}