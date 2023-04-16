import { apiClient } from "./ApiClient"

// export const executeBasicAuthenticationService = 
//     (token) => apiClient.get(`/basicauth`, {
//         headers: {
//             Authorization: token
//         }
//     })

export const executeJwtAuthenticationService =
    (username, password) => apiClient.post(`/auth/authenticate`, { username, password })

// export const executeRegistrationService =
//     (firstname, lastname, username, password) => apiClient.post(`/auth/register`, { firstname, lastname, username, password })
// console.log(executeRegistrationService);

export const executeRegistrationService = async (firstname, lastname, username, password) => {
    try {
        const response = await apiClient.post(`/auth/register`, { firstname, lastname, username, password });
        console.log(response.data)
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data)
            return error.response.data;
        } else {
            return error.message;
        }
    }
};

export const executeLogout =
    () => apiClient.post(`/auth/logout`)
