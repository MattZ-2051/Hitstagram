import React from 'react';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Profile = () => {

    const user = useSelector(state => state.auth)

    console.log(user)

    return (
        <div className='profile'>
            <div className='profile__img'>
                {user.profileImg ? user.profileImg : <AccountCircleIcon />}
            </div>
            <div className='profile__username'>
                {user.username}
            </div>
            <div className='profile__name'>
                {user.fullName}
            </div>
            <div className='profile__bio'>
                {user.bio ? user.bio : <p>No bio yet!</p>}
            </div>
        </div>
    )
}

export default Profile;
