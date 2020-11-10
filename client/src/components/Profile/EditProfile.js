import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { userUpdate } from '../../store/auth';

const EditProfile = () => {

    const user = useSelector(state => state.auth)
    const [fullName, setFullName] = useState('')
    const [bio, setBio] = useState('')
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userUpdate(fullName, bio))
    }

    return (
        <div className='edit-page'>
            <div className='edit-page__profileImg'>
                {user.profileImg ? user.profileImg : <AccountCircleIcon />}
            </div>
            <div className='edit-page__username'>
                {user.username}
            </div>
            <div className='edit-page__name'>
                {user.fullName}
            </div>
            <div className='edit-form'>
                <form onSubmit={handleSubmit}>
                    <div className='edit-form__password'>
                        <label htmlFor='name'>Change Name</label>
                        <input type='text' placeholder='New Full Name' onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className='edit-form__bio'>
                        <label htmlFor='bio'>Change Bio</label>
                        <input type='text' placeholder='bio' onChange={(e) => setBio(e.target.value)} />
                    </div>
                    <div className='edit-form__submitBtn'>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )

}

export default EditProfile
