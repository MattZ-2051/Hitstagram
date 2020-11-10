import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post/Post';
import { posts } from '../../../store/post';
const HomePage = () => {

    const user = useSelector(state => state.auth.id)
    const dispatch = useDispatch();
    const postData = useSelector(state => state.posts.posts)
    useEffect(() => {
        dispatch(posts(user))
    }, [])

    if (postData === undefined) {
        return <h1>loading...</h1>
    }
    return (
        <div className='homepage'>
            {postData.posts.map((item, index) => {
                return <Post key={index} data={item} />
            })}
        </div>
    )
}

export default HomePage
