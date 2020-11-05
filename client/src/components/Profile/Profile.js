import React from 'react';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Profile = () => {

    const user = useSelector(state => state.auth)

    console.log(user)

    return (
        <div className='profile'>
            profile
        </div>
    )
}

export default Profile;
