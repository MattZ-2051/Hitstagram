import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { login } from '../../store/auth';
import { useHistory, NavLink } from 'react-router-dom';

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
        dispatch(login('Demo', 'password'))
        history.push('/')
    }

    return (
        <div className='login'>

            <div className='login-form'>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className='login-form__username'>
                        <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='login-form__password'>
                        <input type='text' type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='login-form__btn'>
                        <div>
                            <button type='submit'>Log in</button>
                        </div>
                        <div>
                            <button type='submit' onClick={handleDemoLogin}>Demo User</button>
                        </div>
                    </div>
                </form>
                <NavLink className='signup-link' to='/signup'>Dont have an account? Sign up!</NavLink>
            </div>
            <div className='login-images'>
                <h1>Picstagram</h1>
                <img src='https://images.unsplash.com/photo-1605663585104-02b44080a242?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' alt='image not found' />
            </div>
            <div className='github-icon'>
                <a href='https://github.com/MattZ-2051/Hitstagram'>
                    <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fp1em%2FLogos%2Fgithub1600.png&f=1&nofb=1' alt='' />
                </a>
                <p>Picstagram is a web application where you can make posts, comment on posts and follow your friends (based off the popular application instagram). If you want to see more of my code click the github icon to go to my github profile!</p>
            </div>
        </div>

    )
}

export default Login
