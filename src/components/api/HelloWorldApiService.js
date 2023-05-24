import { apiClient } from "./ApiClient";


export const helloWorldCall = () => apiClient.get('/hello-world')
