import React, { useState } from 'react';
import './Upload.css';
import { useSelector } from 'react-redux';

const Upload = () => {

    const [photoFile, setPhotoFile] = useState(null);
    const fetchWithCSRF = useSelector(state => state.auth.csrf)
    const user = useSelector(state => state.auth)

    const handleChange = (e) => {
        setPhotoFile(e.target.value)
    }

    const postPhoto = async (formData) => {
        const res = await fetchWithCSRF()
        if (res.ok) {
            window.location.href = `/profile/${user.id}`
        }
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('photoFile', photoFile)
        postPhoto(formData)
    }
    return (
        <div className='upload'>
            <form>
                <p>Upload a photo!</p>
                <input
                    className='upload__input'
                    onChange={handleChange}
                    type='file'
                    name='file'
                    accept='.jpg, .gif, .png'
                />
            </form>
        </div>
    )

}

export default Upload
