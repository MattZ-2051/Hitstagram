import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './UserData.css';

const UserData = ({ data }) => {


    return (
        <div className='user'>
            <div className='user__profileImg'>
                {data.profileImg ? <img src={data.profileImg} alt='Image not found' /> : <AccountCircleIcon />}
            </div>
            <div className='user__username'>
                {data.username}
            </div>
        </div>
    )
}

export default UserData
