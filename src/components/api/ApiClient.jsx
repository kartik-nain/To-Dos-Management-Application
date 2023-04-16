import axios from "axios";

// export const apiClient = axios.create({
//     baseURL: 'http://localhost:8080'
// })

export const apiClient = axios.create({
    baseURL: 'https://todos-management-app-backend-production.up.railway.app/'
})