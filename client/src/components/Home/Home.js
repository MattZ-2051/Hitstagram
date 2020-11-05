import React from 'react';
import NavBar from './NavBar/NavBar';
import HomePage from './HomePage/HomePage';

const Home = () => {
    return (
        <div className='home-container'>
            <NavBar />
            <HomePage />
        </div>
    )
}

export default Home;
