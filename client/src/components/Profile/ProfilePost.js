import React from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './ProfilePost.css';


const ProfilePost = ({ post }) => {

    const history = useHistory();

    const postRoute = () => {
        history.push(`/post/${post.id}`)
    }

    return (
        <>
            <div className='single-post'>
                <img src={post.img} alt='Image not Found' onClick={postRoute} />
            </div>
        </>
    )

}

export default ProfilePost;
