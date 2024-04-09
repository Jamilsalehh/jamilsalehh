import axios from 'axios';
import { toast } from 'react-toastify';


export const BACKEND_URL = "http://localhost:5000";

export const userbookSession = async (session) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/users/sessions`, session, {
            withCredentials: true, // Include credentials in the request
            credentials: 'include' // Use credentials from the browser's cookie jar
        });
        if(response.status === 201){
            console.log("Booking Successful");
            console.log(response);
        }
        return response.data;
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log(message);
    }
}