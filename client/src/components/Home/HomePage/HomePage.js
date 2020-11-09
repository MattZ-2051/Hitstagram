import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post/Post';
import { posts } from '../../../store/post';
const HomePage = () => {

    const user = useSelector(state => state.auth.id)
    const dispatch = useDispatch();
    const postData = useSelector(state => state.posts)
    useEffect(() => {
        dispatch(posts(user))
    }, [])


    return (
        <div className='homepage'>
            {postData.map((post, index) => {
                return <Post data={post} key={index} />
            })}
        </div>
    )
}

export default HomePage
