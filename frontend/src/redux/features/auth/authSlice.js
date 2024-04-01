/* created slice using rxslice shortcut*/
import { createSlice } from '@reduxjs/toolkit'

const name = JSON.parse(localStorage.getItem("name")) || "";

const initialState = {
    isLoggedIn: false,
    name: name ? name : "",
    user: {
        name: "",
        email: "",
        birthdate: "",
        phone: "",
        paymentInfo :{
            cardNumber : "",
            cvv : "",
            expirationDate : "",
        },
        subscribedToChatbot: "",
    }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action){
        state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action){
        localStorage.setItem("name", JSON.stringify(action.payload));
        state.name = action.payload;
    },
    SET_USER(state, action){
        const profile = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
        state.user.name = profile.name;
        state.user.email = profile.email;
        state.user.phone = profile.phone;
        state.user.paymentInfo = profile.paymentInfo;
        state.user.subscribedToChatbot = profile.subscribedToChatbot;
    }
  }
});

export const {
    SET_LOGIN,
    SET_NAME,
    SET_USER
} = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer