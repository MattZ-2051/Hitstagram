import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { login } from '../../store/auth';
import { Redirect, useHistory } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(username, password))
        history.push('/')
    }

    const handleDemoLogin = (e) => {
        e.preventDefault()
        dispatch(login('Simp', 'password'))
        history.push('/')
    }

    return (
        <div className='login'>
            <div className='login-form'>
                <form onSubmit={handleLogin}>
                    <div className='login-form__username'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='login-form__password'>
                        <label htmlFor='username' >Password</label>
                        <input type='text' type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='login-form__btn'>
                        <button type='submit'>Log in</button>
                        <button type='submit' onClick={handleDemoLogin}>Demo User</button>
                    </div>
                </form>
            </div>
            <a href='/sign-up'>Sign Up</a>
        </div>

    )
}

export default Login
