import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/auth';
import './Logout.css';

const Logout = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const handleLogout = () => {
        dispatch(logout())
        history.push('/login')
    }
    return (
        <div className='logout'>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout
