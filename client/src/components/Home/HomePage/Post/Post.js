import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Post.css'

const Post = ({ data }) => {
    return (
        <div className='post'>
            <div className='post__img'>
                <img />
            </div>
            <div className='post__caption'>
            </div>
        </div>
    )
}

export default Post;
