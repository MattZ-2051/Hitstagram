import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/auth';

const Signup = () => {

    const [fullName, setFullName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleSignup = (e) => {
        e.preventDefault()
        dispatch(signup(fullName, username, password))
    }

    return (
        <div className='signup'>
            <div className='signup-form'>
                <form onSubmit={handleSignup}>
                    <div className='signup-form__fullname'>
                        <label htmlFor='fullname'>Full Name</label>
                        <input type='text' placeholder='Full Name' onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className='signup-form__username'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='signup-form__password'>
                        <label htmlFor='username' >Password</label>
                        <input type='text' type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='signup-form__btn'>
                        <button type='submit'>Sign up</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
