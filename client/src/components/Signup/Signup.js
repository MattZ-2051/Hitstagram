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
                        <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='signup-form__btn'>
                        <div>
                            <button type='submit'>Sign up</button>
                        </div>
                    </div>
                </form>
                <NavLink className='login-link' to='/login'>Have an account? Log in!</NavLink>
            </div>
            <div className='login-images'>
                <h1>Picstagram</h1>
                <img src='https://images.unsplash.com/photo-1606928030175-b342a52970cb?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' alt='Not Found' />
            </div>
            <div className='github-icon'>
                <a href='https://github.com/MattZ-2051/Hitstagram'>
                    <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmaxcdn.icons8.com%2FShare%2Ficon%2Fp1em%2FLogos%2Fgithub1600.png&f=1&nofb=1' alt='Not Found' />
                </a>
                <p>Picstagram is a web application where you can make posts, comment on posts and follow your friends (based off the popular application instagram). If you want to see more of my code click the github icon to go to my github profile!</p>
            </div>
        </div>
    )
}

export default Signup;
