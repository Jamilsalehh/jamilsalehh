import { useState,useEffect,useContext } from "react";
import isTherapistContext from "../UserContext/IsTherapist";
import { TextField, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { updateProfile, updateTherapist } from "../../redux/services/authService";

const UserInfo = ({user}) => {
    
const [isTherapist,setIsTherapist] = useContext(isTherapistContext);


const [editedUser, setEditedUser] = useState({ ...user }); // Initialize editedUser state with user object
const [editMode, setEditMode] = useState(false); // State to toggle edit mode

useEffect(()=>{
},[editMode])
useEffect(()=>{
  console.log(editedUser)
},[editedUser])
// Handle changes in user information
const handleChange = (e) => {
  const { name, value } = e.target;
  if (name === "cardNumber" || name === "cvv" || name === "expirationDate") {
    setEditedUser(prevState => ({
      ...prevState,
      paymentInfo: {
        ...prevState.paymentInfo,
        [name]: value
      }
    }));
  } else {
    setEditedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
};

// Handle click on the pen icon to enable edit mode for a specific field
const handleEdit = (fieldName) => {
  
  if (fieldName === "cardNumber" || fieldName === "cvv" || fieldName === "expirationDate") {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      paymentInfo:{
        ...prevEditMode.paymentInfo,
        [fieldName]: true,
      }  
    }));
  }else{
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [fieldName]: true,
    }));
  }
  };

// Handle submission of edited user information
const handleSubmit = () => {
  // Create a new FormData object
  var updatedUser;
  if(!isTherapist){
    updatedUser = {
      name: "",
      email: "",
      birthdate: "",
      phone: "",
      paymentInfo : {
        cardNumber: "",
        cvv: "",
        expirationDate: "",
      }
    }
    updatedUser.name= editedUser.name;
    updatedUser.email= editedUser.email;
    updatedUser.birthdate= editedUser.birthdate;
    updatedUser.phone= editedUser.phone;
    updatedUser.paymentInfo.cardNumber= editedUser.paymentInfo.cardNumber;
    updatedUser.paymentInfo.cvv= editedUser.paymentInfo.cvv;
    updatedUser.paymentInfo.expirationDate= editedUser.paymentInfo.expirationDate;

    updateProfile(updatedUser);
  }else{
    updatedUser = {
      name: "",
      email: "",
      qualifications: "",
      bio: "",
      availability:"",
    }
    updatedUser.name= editedUser.name;
    updatedUser.email= editedUser.email;
    updatedUser.qualifications= editedUser.qualifications;
    updatedUser.bio= editedUser.bio;
    updatedUser.availability= editedUser.availability;
    
    updateTherapist(updatedUser);
  }
   

  

  // Disable edit mode after submission
  setEditMode(false);
};


const isPaymentInfoOnly = () => {
  if(editMode && editMode.paymentInfo){
  const keys = Object.values(editMode && editMode.paymentInfo); 
  return keys.includes(true);
  }else{
    return false;
  }
};

const whichPaymentInfo = () => {
  if(editMode && editMode.paymentInfo){
    const key = Object.keys(editMode.paymentInfo); 
    console.log("key: " + key);
    return key;
  }else{
    return [];
  }
}

return (
    <>
      <div className="userinfo-wrap-wrapper">
        <div className="userinfo-wrapper">
         <form onSubmit={(e)=>{e.preventDefault();
          handleSubmit()}}> 
          <div>
            <TextField
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              disabled={!editMode.name}
              fullWidth
            />
            {!editMode.name && (
              <IconButton onClick={() => handleEdit("name")}>
                <EditIcon />
              </IconButton>
            )}
          </div>
          <div>
            <TextField
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              disabled={!editMode.email}
              fullWidth
            />
            {!editMode.email && (
              <IconButton onClick={() => handleEdit("email")}>
                <EditIcon />
              </IconButton>
            )}
          </div>
          {/* Add similar sections for other user properties */}
          {!isTherapist && <>
          <div>
            <input
              type="date"
              name="birthdate"
              value={editedUser.birthdate.split("T")[0]}
              onChange={handleChange}
              disabled={!editMode.birthdate}
              style={{ display: editMode.birthdate ? "block" : "none" }}
            />
            {!editMode.birthdate && (
              <div>
                {editedUser.birthdate.split("T")[0]}{" "}
                <IconButton onClick={() => handleEdit("birthdate")}>
                  <EditIcon />
                </IconButton>
              </div>
            )}
          </div>
          <div>
          <input 
            type="tel" 
            id="phone" 
            value={editedUser.phone}
            name="phone" 
            pattern="[0-9]{2}[0-9]{3}[0-9]{3}" 
            onChange={handleChange}
            disabled={!editMode.phone}
            style={{ display: editMode.phone ? "block" : "none" }}
            required 
            />
            {!editMode.phone && (
                <div>
            {editedUser.phone}{" "}
              <IconButton onClick={() => handleEdit("phone")}>
                <EditIcon />
              </IconButton>
            </div>
            )}
          </div>
          <div>
            <input 
              type="tel" 
              id="cardNumber" 
              value={editedUser.paymentInfo.cardNumber || ''} 
              name="cardNumber" 
              pattern="[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}" 
              onChange={handleChange}
              disabled={!editMode.paymentInfo || !editMode.paymentInfo.cardNumber}
              style={{ display: (editMode.paymentInfo && editMode.paymentInfo.cardNumber) ? "block" : "none" }}
              required 
            />
            {  !whichPaymentInfo().includes("cardNumber") && (
              <div>
                {(editedUser.paymentInfo && editedUser.paymentInfo.cardNumber) || ''}{" "}
                <IconButton onClick={() => handleEdit("cardNumber")}>
                  <EditIcon />
                </IconButton>
              </div>
            )}
          </div>
          <div>
            <input 
              type="tel" 
              id="cvv" 
              value={editedUser.paymentInfo.cvv || ''} 
              name="cvv" 
              pattern="[0-9]{3}" 
              onChange={handleChange}
              disabled={!editMode.paymentInfo || !editMode.paymentInfo.cvv}
              style={{ display: (editMode.paymentInfo && editMode.paymentInfo.cvv) ? "block" : "none" }}
              required 
            />
            {!whichPaymentInfo().includes("cvv") &&  (
              <div>
                {(editedUser.paymentInfo && editedUser.paymentInfo.cvv) || ''}{" "}
                <IconButton onClick={() => handleEdit("cvv")}>
                  <EditIcon />
                </IconButton>
              </div>
            )}
          </div>
          <div>
            <input
              type="date"
              name="expirationDate"
              value={editedUser.paymentInfo.expirationDate.split("T")[0]}
              onChange={handleChange}
              disabled={!editMode.paymentInfo || !editMode.paymentInfo.expirationDate}
              style={{ display: (editMode.paymentInfo && editMode.paymentInfo.expirationDate) ? "block" : "none" }}
            />
            {!whichPaymentInfo().includes("expirationDate") && (
              <div>
                {editedUser.paymentInfo.expirationDate.split("T")[0]}{" "}
                <IconButton onClick={() => handleEdit("expirationDate")}>
                  <EditIcon />
                </IconButton>
              </div>
            )}
          </div>
          </>}
          {isTherapist && <>
            <div>
            <TextField
              name="qualifications"
              value={editedUser.qualifications}
              onChange={handleChange}
              disabled={!editMode.qualifications}
              fullWidth
            />
            {!editMode.qualifications && (
              <IconButton onClick={() => handleEdit("qualifications")}>
                <EditIcon />
              </IconButton>
            )}
          </div>
          <div>
            <TextField
              name="bio"
              value={editedUser.bio}
              onChange={handleChange}
              disabled={!editMode.bio}
              fullWidth
            />
            {!editMode.bio && (
              <IconButton onClick={() => handleEdit("bio")}>
                <EditIcon />
              </IconButton>
            )}
          </div>
          <div>
            <TextField
              name="availability"
              value={editedUser.availability}
              onChange={handleChange}
              disabled={!editMode.availability}
              fullWidth
            />
            {!editMode.availability && (
              <IconButton onClick={() => handleEdit("availability")}>
                <EditIcon />
              </IconButton>
            )}
          </div>
          </>}
          <div>
            <button type="submit" disabled={(
              !isPaymentInfoOnly() &&
              !Object.values(editMode).includes(true)
            )}
            >
              Save
            </button>
          </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserInfo;