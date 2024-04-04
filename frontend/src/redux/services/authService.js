// Packages
import axios from 'axios';
import { toast } from 'react-toastify';


export const BACKEND_URL = "http://localhost:5000";

export const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export const registerUser = async (user) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/register`, user);
        if(response.statusText === "OK"){
            console.log("Registration Successful.");
            console.log(response);
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message);
    }
}

export const registerTherapist = async (user) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/therapists/register`, user);
        if(response.statusText === "OK"){
            console.log("Registration Successful.");
            console.log(response);
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message);
    }
}

export const loginUser = async (user) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, user);
        if(response.statusText === "OK"){
            console.log("Login Successful.");
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message);
    }
}

export const logoutUser = async (user) => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}

export const forgotPassword = async (user) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, user);
        if(response.statusText === "OK"){
            toast.success(response.data.message);
        }
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}

export const resetPassword = async (user, resetToken) => {
    try {
        const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, user);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}


export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}

export const getUser = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/getUser`);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}

export const updateProfile = async (formData) => {
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/users/updateUser`, formData);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}