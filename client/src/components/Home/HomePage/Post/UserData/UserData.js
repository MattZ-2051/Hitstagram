import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './UserData.css';
import { useHistory } from 'react-router-dom';

const UserData = ({ data }) => {

    const history = useHistory()

    const routeChange = () => {
        history.push(`/profile/${data.id}`)
    }

    return (
        <div className='user' onClick={routeChange}>
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
