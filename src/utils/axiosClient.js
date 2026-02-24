import axios from "axios";

// Use the environment variable
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,  // for Vite
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;
