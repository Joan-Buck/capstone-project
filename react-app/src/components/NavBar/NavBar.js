import React, { useState } from 'react';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginFormModal';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import logo from '../../images/favicon-32x32.png';
import './NavBar.css';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [onMyTrucks, setOnMyTrucks] = useState('/my-food-trucks');

  const location = useLocation();
  const matchingPath = location.pathname === onMyTrucks;

  const demoLogin = async (e) => {
    e.preventDefault();
    const email = 'demo@aa.io';
    const password = 'password';

    dispatch(sessionActions.login(email, password));
    return <Redirect to="/" />

  }

  let sessionMenu;

  if (sessionUser && matchingPath) {
    sessionMenu = (
      <>
        <div className='navbar-button-group'>
          <div className='navbar-button'>
            <NavLink to='/food-trucks' exact={true} className='navbar-link'>
              All Food Trucks
            </NavLink>
          </div>
          <LogoutButton className={'navbar-button'} />
        </div>
      </>
    )
  } else if (sessionUser && !matchingPath) {
    sessionMenu = (
      <>
        <div className='navbar-button-group'>
          <div className='navbar-button'>
            <NavLink to='/my-food-trucks' exact={true} className='navbar-link'>
              My Food Trucks
            </NavLink>
          </div>
          <LogoutButton className={'navbar-button'} />
        </div>
      </>
    )
  } else {
    sessionMenu = (
    <>
      <div className='navbar-button-group'>
        <button className='navbar-button' onClick={demoLogin}>
          Demo
        </button>
        <LoginFormModal className={'navbar-button'} />
        <div className='navbar-button'>
          <NavLink to='/sign-up' exact={true} className='navbar-link'>
            Sign Up
          </NavLink>
        </div>
      </div>
    </>
    )
  }






  return (
    <nav className='navbar-container'>
      <div className='navbar-button-group'>
        <div className='navbar-home-button'>
          <NavLink to='/' exact={true} className='navbar-home-link'>
            <div className='navbar-home'>What The Truck</div>
            <img src={logo} alt='food-truck-logo' className='navbar-logo' />
          </NavLink>
        </div>
      </div>
      {sessionMenu}
    </nav>
  );
}

export default NavBar;
