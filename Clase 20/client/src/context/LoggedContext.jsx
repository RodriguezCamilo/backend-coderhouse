import { createContext } from "react";
import { useState, useEffect } from "react";
import { getCookiesByName } from "../utils/cookieUtils";
import { jwtDecode } from "jwt-decode"

export const LoggedContext = createContext()

export const LoggedProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false)
    const [token, setToken] = useState()
    const [userRol, setUserRol] = useState()
    const [userInfo, setUserInfo] = useState()

    const logged = () => {
        try {
            const token = getCookiesByName('jwtCookie')
            if (token) {
                setToken(token)
                let decode = jwtDecode(token)
                setUserInfo(prevState => decode)
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
        <LoggedContext.Provider value={{ isLogged, setIsLogged, userRol, setUserRol, logged, userInfo, token }}>
            {children}
        </LoggedContext.Provider>
    )
}