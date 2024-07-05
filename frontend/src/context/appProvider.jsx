import { useState, createContext } from "react"
//For global data in the application
const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)

    return <AppContext.Provider
        value={{ loggedIn, setLoggedIn }}>
        {children}
    </AppContext.Provider>
}
export default AppContext