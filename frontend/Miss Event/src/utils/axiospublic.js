import axios from "axios";

// const baseURL = 'http://127.0.0.1:8000';
const baseURL = 'https://miss-event.onrender.com';

const axiosPublic = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    // 'Content-Type': 'application/json',
  },
});

export default axiosPublic;