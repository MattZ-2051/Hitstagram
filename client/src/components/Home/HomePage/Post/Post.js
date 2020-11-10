import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Post.css'
import PostData from './PostData/PostData';
import UserData from './UserData/UserData';

const Post = ({ data }) => {

    console.log(data)

    return (
        <div className='post'>
            <div className='post__img'>
                <img src={data.img} alt='Image not Found' />
            </div>
            <div className='post__caption'>
                {data.caption}
            </div>
        </div>
    )
}

export default Post;
