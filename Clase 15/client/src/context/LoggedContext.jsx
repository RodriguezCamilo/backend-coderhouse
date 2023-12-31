import { createContext } from "react";
import { useState, useEffect } from "react";
import { getCookiesByName } from "../utils/cookieUtils";
import { jwtDecode } from "jwt-decode"

export const LoggedContext = createContext()

export const LoggedProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false)
    const [userRol, setUserRol] = useState()

    const logged = () => {
        try {
            const token = getCookiesByName('jwtCookie')
            if (token) {
                let decode = jwtDecode(token)
                setUserRol(prevState => decode?.user?.rol)
                setIsLogged(prevState => true)
            } else {
                setIsLogged(prevState => false)
                setUserRol(prevState => null)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        logged()
    }, [])

    return (
        <LoggedContext.Provider value={{ isLogged, setIsLogged, userRol, setUserRol, logged }}>
            {children}
        </LoggedContext.Provider>
    )
}