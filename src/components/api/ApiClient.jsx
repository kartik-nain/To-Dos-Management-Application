import axios from "axios";

export const apiClient = axios.create({
    // baseURL: 'http://localhost:8080/'
    baseURL: 'http://todosbackend-env.eba-dvn5ptkj.us-east-1.elasticbeanstalk.com/'
})

// export const apiClient = axios.create({
//     baseURL: 'https://todos-management-app-backend-production.up.railway.app/'
// })