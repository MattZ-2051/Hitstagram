import React from 'react';
import CommentData from './CommentData/CommentData';
import CommentUserInfo from './CommentUserInfo/CommentUserInfo';
import './Post.css'
import PostData from './PostData/PostData';
import UserData from './UserData/UserData';

const Post = ({ data }) => {

    console.log(data)
    return (
        <>
            {data.posts.map((item, index) => {
                return <div className='post' key={index}>
                    <UserData data={data.userInfo[index]} />
                    <PostData data={item} />
                    <div className='post__comment'>
                        <CommentUserInfo data={data.postCommentUserInfo[index]} />
                        <CommentData data={data.postComments[index]} />
                    </div>
                </div>
            })}
        </>
    )
}

export default Post;
