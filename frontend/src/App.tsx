import { DarkThemeToggle } from "flowbite-react";
import NavBar from './Components/NavBar/NavBar';
import StartUpScreen from "./Components/StartUpScreen/StartUpScreen";
import Login from "./Components/Login/Login";
function App() {
  return (
    <>
      <NavBar />
      <Login />
     {/* <DarkThemeToggle /> */}
     </>
  );
}

export default App;
