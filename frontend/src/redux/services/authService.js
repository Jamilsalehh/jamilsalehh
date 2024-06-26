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
        const response = await axios.post(`${BACKEND_URL}/api/users/login`, user, {
            withCredentials: true, // Include credentials in the request
            credentials: 'include' // Use credentials from the browser's cookie jar
        });
        if(response.status === 201){
            console.log("Login Successful.");
            console.log(response)
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message);
    }
}



export const logoutUser = async (user) => {
    try {
        await axios.get(`${BACKEND_URL}/api/users/logout`,{
            withCredentials: true, // Include credentials in the request
            credentials: 'include' // Use credentials from the browser's cookie jar
        });
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
        const response = await axios.get(`${BACKEND_URL}/api/users/loggedin`,{
            withCredentials: true, // Include credentials in the request
            credentials: 'include' // Use credentials from the browser's cookie jar
        });
        console.log(response);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}

export const getUser = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/getUser`,{
            withCredentials: true, // Include credentials in the request
            credentials: 'include' // Use credentials from the browser's cookie jar
        });
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}

export const updateProfile = async (formData) => {
    console.log(formData)
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/users/updateUser`, formData,{
            withCredentials: true, // Include credentials in the request
            credentials: 'include' // Use credentials from the browser's cookie jar
        });
        console.log(response);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}

export const updateTherapist = async (formData) => {
    console.log(formData)
    try {
        const response = await axios.patch(`${BACKEND_URL}/api/therapists/updateprofile`, formData,{
            withCredentials: true, // Include credentials in the request
            credentials: 'include' // Use credentials from the browser's cookie jar
        });
        console.log(response);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}

export const getAllTherapists = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/users/therapists`,{
            withCredentials: true, // Include credentials in the request
            credentials: 'include' // Use credentials from the browser's cookie jar
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}


//Therapist

export const loginTherapist = async (user) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/therapists/login`, user,{
            withCredentials: true, // Include credentials in the request
            credentials: 'include' // Use credentials from the browser's cookie jar
        });
        if(response.status === 201){
            console.log("Login Successful.");
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message);
    }
}

export const getUserAsTherapist = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/therapists/getuser`,{
            withCredentials: true, // Include credentials in the request
            credentials: 'include' // Use credentials from the browser's cookie jar
        });
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        toast.error(message);
    }
}