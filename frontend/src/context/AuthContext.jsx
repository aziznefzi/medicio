import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
 const AuthContext = createContext()
 export const AuthUserAkhter = () => {
    return useContext(AuthContext);
}
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
     const token = localStorage.getItem("token");
      if(token) {
        try {
            const decode = jwtDecode(token);
            console.log("Decoded token from storage:", decode);
            setUser(decode);
        } catch (error) {
            console.error("Error decoding storage token:", error);
        }
      }
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        try {
            const decode = jwtDecode(token);
            console.log("Decoded token on login:", decode);
            setUser(decode);
        } catch (error) {
            console.error("Error decoding token on login:", error);
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}