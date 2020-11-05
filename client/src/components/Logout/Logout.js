import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth';
import './Logout.css';

const Logout = () => {

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div className='logout'>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout
