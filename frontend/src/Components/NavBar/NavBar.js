import { Avatar, Dropdown, Navbar } from "flowbite-react";
import StartUpScreen from "../StartUpScreen/StartUpScreen";
import { useNavigate } from 'react-router-dom'; 
import { logoutUser } from "../../redux/services/authService";
import React, { useEffect, useState,useContext } from 'react';
import UserContext from "../UserContext/UserContext";
import isTherapistContext from '../UserContext/IsTherapist';

const NavBar = ({user}) => {
  const [userr, setUser] = useContext(UserContext);
  const [isTherapist,setIsTherapist] = useContext(isTherapistContext);
  const navigate = useNavigate();

  const logout = ()=>{
    logoutUser();
    setUser(null);
    setIsTherapist(false);
    navigate('/');
  };

  const viewSessions = () =>{
    navigate('/UserSessions');
  }

    return (<>  <Navbar fluid rounded>
        <Navbar.Brand onClick={()=>{navigate('/Home')}}>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Aaqlak</span>
        </Navbar.Brand>
        {user && <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.name}</span>
              <span className="block truncate text-sm font-medium">{user.email}</span>
            </Dropdown.Header>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item onClick={viewSessions}>Sessions</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>}
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
       </> );
}
 
export default NavBar;