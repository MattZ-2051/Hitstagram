import React from 'react';
import './Post.css'
import PostData from './PostData/PostData';
import UserData from './UserData/UserData';

const Post = ({ data }) => {


    return (
        <>
            {data.posts.map((item, index) => {
                return (
                    <div className='post' key={index}>
                        <UserData data={data.userInfo[index]} />
                        <PostData data={item} />
                    </div>
                )
            })}
        </>
    )
}

export default Post;
