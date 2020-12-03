import React from 'react';
import { useHistory } from 'react-router-dom';
import './ProfilePost.css';


const ProfilePost = ({ post }) => {

    const history = useHistory();

    const postRoute = () => {
        history.push(`/post/${post.id}`)
    }

    return (
        <>
            <div className='single-post'>
                <img src={post.img} alt='Not Found' onClick={postRoute} />
            </div>
        </>
    )

}

export default ProfilePost;
