import { DarkThemeToggle } from "flowbite-react";
import NavBar from './Components/NavBar/NavBar';
import StartUpScreen from "./Components/StartUpScreen/StartUpScreen";
import Login from "./Components/Login/Login";
import UserContext from "./Components/UserContext/UserContext.js";
import isTherapistContext from "./Components/UserContext/IsTherapist";
import { useState,useEffect } from "react";
import UserHome from "./Components/Home/UserHome";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import AllTherapists from "./Components/AllTherapists/AllTherapists";
import { getLoginStatus, getUser, getUserAsTherapist} from "./redux/services/authService";
import UserSessions from "./Components/Sessions/UserSessions";
import UserInfo from "./Components/UserInfo/UserInfo";

function App() {
  const [user, setUser] = useState(null);
  const [isTherapist,setIsTherapist] = useState(null);

  useEffect(()=>{
    const fetchData = async () => {
      try {
          const user = await getUser(); // Await the result of the getUser function
          if(user){
            setUser(user);
            setIsTherapist(false);
          }else{
            try{
              const user = await getUserAsTherapist();
              if(user){
                console.log(user)
                setUser(user);
                setIsTherapist(true);
              }
            }catch(error){
              console.log(error);
            }
          }
      } catch (error) {
          console.log(error);
      }
  };
  
  fetchData(); // Call the fetchData function to fetch the user data
    
  },[])
  return (
    <>
    <UserContext.Provider value={[user, setUser]}>
      <isTherapistContext.Provider value={[isTherapist,setIsTherapist]}>
        
        <BrowserRouter>
        <Routes>    
        <Route path="/" element={ <> <NavBar user={user} /> {!user && <Login />} </>}/>
        {/* <Route path="/" element={!user && <Login />} /> */}
        <Route path="/Home" element={<> <NavBar user={user} />{user && <UserHome />} </>} />     
        <Route path="/AllTherapists" element={ <> <NavBar user={user} /> {user && <AllTherapists />} </>} />  
        <Route path="/UserSessions" element={ <> <NavBar user={user} /> {user && <UserSessions />} </>} />  
        <Route path="/UserInfo" element={ <> <NavBar user={user} /> {user && <UserInfo user={user} />} </>} />  
        </Routes>
        </BrowserRouter>
      </isTherapistContext.Provider>
    </UserContext.Provider>
     {/* <DarkThemeToggle /> */}
     </>
  );
}

export default App;
