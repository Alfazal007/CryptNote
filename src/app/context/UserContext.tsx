"use client";
import { DOMAIN } from "@/constants";
import axios from "axios";
import { createContext, useState } from "react"

export interface User {
    accessToken: string;
    username: string;
}

export const UserContext = createContext<{
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    fetchMe: () => Promise<boolean>
}>({
    user: null,
    setUser: () => { },
    fetchMe: async (): Promise<boolean> => { return false }
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    async function fetchMe(): Promise<boolean> {
        try {
            const response = await axios.get(`${DOMAIN}/api/auth/me`)
            if (response.status === 200) {
                setUser({
                    username: response.data.username,
                    accessToken: response.data.accessToken
                })
                return true
            }
            return false
        } catch (err) {
            return false
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, fetchMe }}>
            {children}
        </UserContext.Provider >
    );
};

export default UserProvider;
