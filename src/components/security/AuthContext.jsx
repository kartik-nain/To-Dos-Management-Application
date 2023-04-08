import { createContext, useContext, useState } from "react"
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService"
import { apiClient } from "../api/ApiClient"

// 1. Create a context
export const AuthContext = createContext()

// 4. Create ahook of ghat context to use easily in other components
export const useAuth = () => useContext(AuthContext)

// 2. Share the created context with other components
export default function AuthContextProvider( {children} ) {

    // 3. Put some state in context
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    // function login(username, password) {
    //     if(username === 'in28minutes' && password === 'p'){
    //         setIsAuthenticated(true)
    //         setUsername(username)
    //         return true
    //     }else{
    //         setIsAuthenticated(false)
    //         setUsername(null)
    //         return false
    //     }
    // }

    // async function login(username, password) {

    //     const baToken = 'Basic ' + window.btoa(username + ":" + password)
        
    //     try{
    //         const response = await executeBasicAuthenticationService(baToken)
            
    //         if(response.status==200){
    //             setIsAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)

    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log("intercepting and adding token")
    //                     config.headers.Authorization=baToken
    //                     return config
    //                 }
    //             )

    //             return true
    //         }else{
    //             logout()
    //             return false
    //         }
    //     }catch(err){
    //         logout()
    //         return false
    //     }
    
    // }

    async function login(username, password) {

        //const baToken = 'Basic ' + window.btoa(username + ":" + password)
        
        try{
            const response = await executeJwtAuthenticationService(username, password)
            
            if(response.status==200){
                const jwtToken = 'Bearer ' + response.data.token
                setIsAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log("intercepting and adding token")
                        config.headers.Authorization=jwtToken
                        return config
                    }
                )

                return true
            }else{
                logout()
                return false
            }
        }catch(err){
            logout()
            return false
        }
    
    }

    function logout() {
        setIsAuthenticated(false)
        setUsername(null)
        setToken(null)
    }


    return(
        <AuthContext.Provider value={ {isAuthenticated, setIsAuthenticated, login, logout, username, token} } >
            {children}
        </AuthContext.Provider>
    )
}