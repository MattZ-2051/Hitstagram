import React from 'react';
import './NavBar.css'
import SearchBar from './SearchBar/SearchBar';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Logout from '../../Logout/Logout';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {

    const history = useHistory()
    const userId = useSelector(state => state.auth.id)

    const routeChange = () => {
        history.push(`/profile/${userId}`)
    }

    return (
        <div className='navbar'>
            <div className='navbar__name'>
                Hitstagram
            </div>
            <div className='navbar__searchBar'>
                <SearchBar />
            </div>
            <div className='navbar__homeBtn'>
                <HomeIcon />
            </div>
            <div className='navbar__exploreBtn'>
                <ExploreIcon />
            </div>
            <div className='navbar__uploadBtn'>
                <AddAPhotoIcon />
            </div>
            <div className='navbar__profileBtn'>
                <AccountCircleIcon onClick={routeChange} />
            </div>
            <div className='/navbar__logoutBtn'>
                <Logout />
            </div>
        </div>
    )
}

export default NavBar;
