import axios from "axios";

const BASE_URL = "https://mytodoapp.onrender.com";

export default axios.create({
    baseURL:BASE_URL
})
