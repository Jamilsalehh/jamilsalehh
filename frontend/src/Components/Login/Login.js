import React, { useEffect, useState,useContext } from 'react';
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
import { validateEmail, loginUser,getLoginStatus,registerUser,registerTherapist,loginTherapist} from '../../redux/services/authService'
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import UserContext from "../UserContext/UserContext";
import isTherapistContext from '../UserContext/IsTherapist';

const initialLoginState = {
  email: "",
  password: ""
}

const initalUserSignUpState = {
  userName: "",
  userEmail: "",
  userPassword: "",
  userBirthDate: "",
  userPhone: "",
  paymentInfo : {
    cardNumber: "",
    cvv: "",
    expirationDate: "",
  }
}

const initalTherapistSignUpState = {
  therapistName: "",
  therapistEmail: "",
  therapistPassword: "",
  therapistBirthDate: "",
  certifications: "",
  bio:"",
  availability:[],
  picture:"",
}

function Login() {
  const [user, setUser] = useContext(UserContext);
  const [isTherapist,setIsTherapist] = useContext(isTherapistContext);
  // const [email,setemail] = useState("");
  // const [password,setpassword] = useState("");
  const dispatch = useDispatch();
  const [loginFormData, setloginFormData] = useState(initialLoginState);
  const [usersignupformData, setUserSignUpFormData] = useState(initalUserSignUpState);
  const [therapistsignupformData, setTherapistSignUpFormData] = useState(initalTherapistSignUpState);
  
  
  
  const { email, password } = loginFormData;
  const { userName,userEmail, userPassword, userBirthDate, userPhone,paymentInfo } = usersignupformData;
  const { therapistName,therapistEmail,therapistPassword,therapistBirthDate,certifications,bio,availability,picture } =  therapistsignupformData;
  useEffect(()=>{
    console.log(user)
  },[user])
  const handleLoginChange = (e) => {
      const { name, value } = e.target;
      setloginFormData({ ...loginFormData, [name]: value});
  }

  const handleUserSignUpChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber" || name === "cvv" || name === "expirationDate") {
      setUserSignUpFormData(prevState => ({
        ...prevState,
        paymentInfo: {
          ...prevState.paymentInfo,
          [name]: value
        }
      }));
    } else {
      setUserSignUpFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }

  const handleTherapistsSignUpChange = (e) => {
    const { name, value } = e.target;
    setTherapistSignUpFormData({ ...therapistsignupformData, [name]: value});
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
        var data = await loginUser(userData);
        if(!data){
          console.log("in");
          console.log(userData);
          data = await loginTherapist(userData);
          setIsTherapist(true);     
        }else{
          setIsTherapist(false);
        }
        setUser(data);
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

  const userRegister = async (e) => {
    e.preventDefault();

    if(!userName || !userEmail || !userPassword || !userBirthDate || !userPhone ){
        return console.log("Please fill in all fields.");
    }
    if(userPassword.length < 6){
        return console.log("Password must be at least 6 characters long.");
    }

    if(!validateEmail(userEmail)){
        return console.log("Invalid email address.");
    }

    const userData = {name:userName,email:userEmail, password:userPassword ,birthdate:userBirthDate,phone:userPhone,paymentInfo:paymentInfo};
    
    try{
        const data = await registerUser(userData);
        await dispatch(SET_LOGIN(true));
        await dispatch(SET_NAME(data.name));
        console.log("Registration Successful.");
    }
    catch(error){
        console.log(error.message);
    }
}

const therapistRegister = async (e) => {
  e.preventDefault();

  if(!therapistName || !therapistEmail || !therapistPassword || !therapistBirthDate || !certifications || !bio ){
      return console.log("Please fill in all fields.");
  }
  if(therapistPassword.length < 6){
      return console.log("Password must be at least 6 characters long.");
  }

  if(!validateEmail(therapistEmail)){
      return console.log("Invalid email address.");
  }

  const userData = {name:therapistName,email:therapistEmail, password:therapistPassword ,birthdate:therapistBirthDate,qualifications:certifications,bio:bio,availability:availability,picture:picture};
  
  try{
      const data = await registerTherapist(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      console.log("Registration Successful.");
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

const [userType, setUserType] = useState("patient");

const handleUserTypeChange = (type) => {
  setUserType(type);
};

useEffect(()=>{
console.log(therapistsignupformData)
},[therapistsignupformData])


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
                    <input type="email" placeholder="Enter your email" required name="email" value={ email } onChange={ handleLoginChange } />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Enter your password" name="password" required value={ password } onChange={ handleLoginChange } />
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
              <div className="title signup">Signup</div>
              <br/>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                <div className={`minititle patient ${userType === "patient" ? "highlighted" : "unhighlighted"}`} onClick={() => handleUserTypeChange("patient")}>Patient</div>
                <div className={`minititle therapist ${userType === "therapist" ? "highlighted" : "unhighlighted"}`} onClick={() => handleUserTypeChange("therapist")}>Therapist</div>
              </div>

              { userType === "patient" ? ( <form onSubmit={userRegister}>
                <div className="input-boxes">
                <div className="row">
                    <div className="col-md-6">
                      <div className="input-box">
                        <i className="fas fa-user"></i>
                        <input type="text" className="form-control" placeholder="Enter your name" name="userName" value={userName} onChange={handleUserSignUpChange} required />
                      </div>
                      <div className="input-box">
                        <i className="fas fa-envelope"></i>
                        <input type="email" className="form-control" placeholder="Enter your email" name="userEmail" value={userEmail} onChange={handleUserSignUpChange} required />
                      </div>
                      <div className="input-box">
                        <i className="fas fa-envelope"></i>
                        <input type="password" className="form-control" placeholder="Enter your email" name="userPassword" value={userPassword} onChange={handleUserSignUpChange} required />
                      </div>
                      <div className="input-box">
                        <i className="fas fa-lock"></i>
                        <input type="date" className="form-control" name="userBirthDate" value={userBirthDate} onChange={handleUserSignUpChange} required />
                      </div>
                     
                    </div>
                    <div className="col-md-6">
                      {/* <div className="title">Payment Info</div> */}
                      <div className="input-box">
                        <i className="fas fa-lock"></i>
                        <input type="text" className="form-control" placeholder="xx/xxxxxx" name="userPhone" value={userPhone} onChange={handleUserSignUpChange}required />
                      </div>
                      <div className="input-box">
                        <i className="fas fa-lock"></i>
                        <input type="text" className="form-control" placeholder="xxxx-xxxx-xxxx-xxxx" name="cardNumber" value={paymentInfo.cardNumber} onChange={handleUserSignUpChange}  />
                      </div>
                      <div className="input-box">
                        <i className="fas fa-lock"></i>
                        <input type="text" className="form-control" placeholder="CVV" name="cvv" value={paymentInfo.cvv} onChange={handleUserSignUpChange}  />
                      </div>
                      <div className="input-box">
                        <i className="fas fa-lock"></i>
                        <input type="date" className="form-control" name="expirationDate" value={paymentInfo.expirationDate} onChange={handleUserSignUpChange} />
                      </div>
                    </div>
                  </div>

                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
                </div>
              </form> ) : (<form onSubmit={therapistRegister}>
              <div className="input-boxes">
                <div className="row">
                    <div className="col-md-6">
                      <div className="input-box">
                        <i className="fas fa-user"></i>
                        <input type="text" className="form-control" placeholder="Enter your name" name='therapistName' onChange={handleTherapistsSignUpChange} required />
                      </div>
                      <div className="input-box">
                        <i className="fas fa-envelope"></i>
                        <input type="email" className="form-control" placeholder="Enter your email" name='therapistEmail' onChange={handleTherapistsSignUpChange}required />
                      </div>
                      <div className="input-box">
                        <i className="fas fa-envelope"></i>
                        <input type="password" className="form-control" placeholder="Enter your password" name='therapistPassword' onChange={handleTherapistsSignUpChange}required />
                      </div>
                      <div className="input-box">
                        <i className="fas fa-lock"></i>
                        <input type="date" className="form-control" name='therapistBirthDate' onChange={handleTherapistsSignUpChange} required />
                      </div>
                      <div className="input-box">
                        <i className="fas fa-lock"></i>
                        <input type="text" className="form-control" name='certifications' onChange={handleTherapistsSignUpChange} placeholder="List of degrees, certifications, etc." required />
                      </div>
                    </div>
                    <div className="col-md-6 bio-wrap">
                      {/* <div className="title">Payment Info</div> */}
                      <div className='bio-wrapper'> 
                        <textarea className='bio' placeholder="Bio..." name='bio' onChange={handleTherapistsSignUpChange}  />
                        </div>
                    </div>
                  </div>
                  <div className="button input-box">
                    <input type="submit" value="Submit" />
                  </div>
                  <div className="text sign-up-text">Already have an account? <label htmlFor="flip">Login now</label></div>
                </div>
              </form>)}
            </div> 
          </div>
        </div>
      </div>
      </div>
  );
}

export default Login;