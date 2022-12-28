import React from 'react'
import "./nav.css"
import blog from "./blogg.jpg"
import camera from "./create.png"
import { useNavigate,NavLink} from 'react-router-dom'

const Header = () => {
    const Navigate = useNavigate();
    const Handlelogout = ()=>{
		alert('Do you want to log out?')
		localStorage.removeItem('token')
		Navigate('/');
	}
  return (

	<div className="body">
    <div className="nav">
      <img className="" src={blog} alt="logo" width="80px" height="70px"/>
     <NavLink to="/add"><img className="camera" src={camera} alt="camera" /></NavLink>
      
    <div onClick={Handlelogout} className="sidebar">
				<span className="header-logout">
				  LogOut
				</span>
			</div>
	</div>
	</div>
  )
}

export default Header