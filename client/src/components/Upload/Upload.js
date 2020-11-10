import React, { useState } from 'react';
import './Upload.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Upload = () => {

    const [photoFile, setPhotoFile] = useState(null);
    const fetchWithCSRF = useSelector(state => state.auth.csrf)
    const userId = useSelector(state => state.auth.id)
    const history = useHistory()

    const handleChange = (e) => {
        setPhotoFile(e.target.files[0])
    }

    const postPhoto = async (formData) => {
        console.log(formData.get('file'))
        const res = await fetchWithCSRF(`/api/post/${userId}/upload`, {
            method: 'POST',
            body: formData
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
            history.push(`/profile/${userId}`)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", photoFile)
        await postPhoto(formData)
    }
    return (
        <div className='upload'>
            <div className='upload-form'>
                <form onSubmit={handleSubmit}>
                    <p>Select a photo to upload</p>
                    <input
                        className='upload-form__input'
                        onChange={handleChange}
                        type='file'
                        name='file'
                    />
                    <button className='upload-form__btn'>Upload</button>
                </form>
            </div>
        </div>
    )

}

export default Upload
