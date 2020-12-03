import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { signup } from '../../store/auth';
import './Signup.css';

const Signup = () => {

    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSignup = (e) => {
        e.preventDefault()
        dispatch(signup(fullName, username, password))
        history.push('/welcome')
    }

    return (
        <div className='signup'>
            <div className='signup-form'>
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>
                    <div className='signup-form__fullname'>
                        <input type='text' placeholder='Full Name' onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className='signup-form__username'>
                        <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='signup-form__password'>
                        <input type='text' type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='signup-form__btn'>
                        <div>
                            <button type='submit'>Sign up</button>
                        </div>
                    </div>
                </form>
                <NavLink className='login-link' to='/login'>Have an account? Log in!</NavLink>
            </div>
        </div>
    )
}

export default Signup;
