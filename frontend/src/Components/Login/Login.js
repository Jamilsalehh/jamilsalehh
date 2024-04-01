import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../Css/Login/Login.css"
import { store } from '../../redux/store'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'; // Import Provider and useDispatch
import { validateEmail, loginUser,getLoginStatus} from '../../redux/services/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';

const initialState = {
  email: "",
  password: ""
}

function Login() {

  // const [loginEmail,setLoginEmail] = useState("");
  // const [loginPassword,setLoginPassword] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);

  const { email, password } = formData;
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value});
  }
  const login = async (e) => {
    e.preventDefault();
    console.log("test");
    if(!email || !password){
       console.log("Please fill in all fields.");
    }
    if(password.length < 6){
       console.log("Password must be at least 6 characters long.");
    }
    if(!validateEmail(email)){
       console.log("Invalid email address.");
    }

    const userData = { email, password };
    try{
        const data = await loginUser(userData);
        await dispatch(SET_LOGIN(true));
        await dispatch(SET_NAME(data.name));
        // localStorage.setItem('authToken', data.token);
        const loginStatus = await getLoginStatus();
        console.log(loginStatus);
        console.log("Login Successful.");
    }
    catch(error){
       console.log(error.message);
    }
}
useEffect(() => {
  const fetchData = async () => {
    try {
      const loginStatus = await getLoginStatus();
      console.log(loginStatus);
    } catch (error) {
      // Handle errors if needed
      console.error(error);
    }
  };

  fetchData(); // Call the async function immediately

}, []);
  return (
    <div className="signup-login-wrapper">
    <div className="container" >
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img src="images/frontImg.jpg" alt="" />
            <div className="text">
              <span className="text-1">Every new friend is a <br /> new adventure</span>
              <span className="text-2">Let's get connected</span>
            </div>
          </div>
          <div className="back">
            <img className="backImg" src="images/backImg.jpg" alt="" />
            <div className="text">
              <span className="text-1">Complete miles of journey <br /> with one step</span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form onSubmit={ login }>
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input type="email" placeholder="Enter your email" required name="email" value={ email } onChange={ handleChange } />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Enter your password" name="password" required value={ password } onChange={ handleChange } />
                  </div>
                  <div className="text"><a href="#">Forgot password?</a></div>
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">Don't have an account? <label htmlFor="flip">Signup now</label></div>
                </div>
              </form>
            </div>
            <div className="signup-form">
              <div className="title">Signup</div>
              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-user"></i>
                    <input type="text" placeholder="Enter your name" required />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input type="text" placeholder="Enter your email" required />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Enter your password" required />
                  </div>
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
}

export default Login;