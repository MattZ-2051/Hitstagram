import React from 'react';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';

const Profile = () => {

    const user = useSelector(state => state.auth)
    const history = useHistory();

    const routeChange = () => {
        history.push(`/profile/${user.id}/edit`)
    }
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
            <div className='profile__edit'>
                <button onClick={routeChange}>Edit Profile</button>
            </div>
        </div>
    )
}

export default Profile;
