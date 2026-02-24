import axios from "axios"

const axiosClient =  axios.create({
    baseURL: 'https://code-arena-backend-psi.vercel.app/',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});


export default axiosClient;

