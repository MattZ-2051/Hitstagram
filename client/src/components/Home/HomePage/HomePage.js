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

    console.log(postData)
    return (
        <div className='homepage'>
            {postData.map((post, index) => {
                return <Post data={post} key={index} />
            })}
            <h1>testing</h1>
        </div>
    )
}

export default HomePage
