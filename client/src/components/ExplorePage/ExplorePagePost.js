import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ExplorePagePost.css';

const ExplorePagePost = ({ post }) => {

    const fetchWithCSRF = useSelector(state => state.auth.csrf)


    return (
        <div className='explore-post'>
            <img src={post.img} alt='image not found' />
        </div>
    )
}

export default ExplorePagePost;
