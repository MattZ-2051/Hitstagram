import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post/Post';
import { posts } from '../../../store/post';
import './HomePage.css';
import Loading from '../../Loading/Loading';

const HomePage = () => {

    const user = useSelector(state => state.auth.id)
    const dispatch = useDispatch();
    const postData = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(posts(user))
    }, [])

    if (postData === undefined || Object.keys(postData).length === 0) {
        return <Loading />
    }

    return (
        <div className='home-container'>
            <Post data={postData} />
        </div>
    )
}

export default HomePage
