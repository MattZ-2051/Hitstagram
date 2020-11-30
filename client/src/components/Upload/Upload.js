import React, { useState } from 'react';
import './Upload.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { newUserPost } from '../../store/post';
import NavBar from '../NavBar/NavBar';

const Upload = () => {

    const [photoFile, setPhotoFile] = useState(null);
    const userId = useSelector(state => state.auth.id);
    const history = useHistory();
    const dispatch = useDispatch();
    const [imgPreview, setImgPreview] = useState(null)
    const [caption, setCaption] = useState('')

    const handleChange = (e) => {
        setPhotoFile(e.target.files[0])
        setImgPreview(URL.createObjectURL(e.target.files[0]))
    }


    const postPhoto = async (formData) => {
        dispatch(newUserPost(userId, formData))
        setTimeout(() => {
            history.push(`my/profile/${userId}`)
        }, 1000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const obj = { 'caption': caption }
        const json = JSON.stringify(obj)
        const blob = new Blob([json], {
            type: 'application/json'
        });
        formData.append('caption', blob)
        formData.append("file", photoFile)
        await postPhoto(formData)
    }

    return (
        <>
            <NavBar />
            <div className='upload'>
                <div className='upload-img-preview'>
                    {imgPreview ?
                        <img src={imgPreview} alt='Upload Image' />
                        :
                        <p>Upload Photo</p>

                    }
                </div>

                <form className='upload-form' onSubmit={handleSubmit}>

                    <p>Select a photo to upload</p>
                    <input
                        className='upload-form__input'
                        onChange={handleChange}
                        type='file'
                        name='file'
                    />
                    <div className='upload-form__caption'>
                        <label htmlFor='caption'>Caption</label>
                        <input onChange={(e) => setCaption(e.target.value)} type='text' name='caption' placeholder='Add a caption to your photo' />
                    </div>
                    <div className='upload-form__btn-div'>
                        <button className='upload-form__btn'>Upload</button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default Upload
