import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
const UserData = ({ data }) => {


    return (
        <div className='user'>
            <div className='user__profileImg'>
                {data.profileImg ? data.profileImg : <AccountCircleIcon />}
            </div>
            <div className='user__username'>
                {data.username}
            </div>
        </div>
    )
}

export default UserData
