import { apiClient } from "./ApiClient"

// export const executeBasicAuthenticationService = 
//     (token) => apiClient.get(`/basicauth`, {
//         headers: {
//             Authorization: token
//         }
//     })

export const executeJwtAuthenticationService =
    (username, password) => apiClient.post(`/auth/authenticate`, { username, password })

export const executeRegistrationService =
    (firstname, lastname, username, password) => apiClient.post(`/auth/register`, { firstname, lastname, username, password })
