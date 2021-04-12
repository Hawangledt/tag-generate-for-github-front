import axios from "axios";
import React from "react";

const api = axios.create({
    baseURL: process.env.REACT_APP_API
})
export default api;