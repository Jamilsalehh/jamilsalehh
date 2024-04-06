import { DarkThemeToggle } from "flowbite-react";
import NavBar from './Components/NavBar/NavBar';
import StartUpScreen from "./Components/StartUpScreen/StartUpScreen";
import Login from "./Components/Login/Login";
import UserContext from "./Components/UserContext/UserContext.js";
import isTherapistContext from "./Components/UserContext/IsTherapist";
import { useState } from "react";
import UserHome from "./Components/Home/UserHome";

function App() {
  const [user, setUser] = useState(null);
  const [isTherapist,setIsTherapist] = useState(null);
  return (
    <>
    <UserContext.Provider value={[user, setUser]}>
      <isTherapistContext.Provider value={[isTherapist,setIsTherapist]}>
        <NavBar />
        {user && <UserHome />}
        {!user && <Login />}
      </isTherapistContext.Provider>
    </UserContext.Provider>
     {/* <DarkThemeToggle /> */}
     </>
  );
}

export default App;
