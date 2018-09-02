import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


const Header = ({currentUser, resetError}) => {
    return <header className="App-header">
    <h1 className="App-title">Northcoders News</h1>
    <h5>{currentUser.username ? `Logged in: ${currentUser.username}` : "Logged Out"}</h5>
    <NavLink exact to='/'><button id="home-button" value="home" onClick={resetError}><i className="fas fa-home"></i></button></NavLink>
  </header>
};

Header.propTypes = {
    currentUser: PropTypes.object,
    resetError: PropTypes.func.isRequired
};

export default Header;