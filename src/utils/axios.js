import axios from "axios";

const instance = axios.create({
    // baseURL:'http://127.0.0.1:4444',
    baseURL:'http://localhost:4444',
    withCredentials: true
});

export default instance;