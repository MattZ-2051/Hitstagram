import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CommentData from '../Home/HomePage/Post/CommentData/CommentData';
import CommentUserInfo from '../Home/HomePage/Post/CommentUserInfo/CommentUserInfo';
import UserData from '../Home/HomePage/Post/UserData/UserData';
import PostData from '../Home/HomePage/Post/PostData/PostData';

const SoloPost = () => {

    const history = useHistory()
    const postId = history.location.pathname.split('/')[2];
    const fetchWithCSRF = useSelector(state => state.auth.csrf);
    const [data, setData] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const res = await fetchWithCSRF(`/api/post/${postId}/data`, {
                method: 'GET'
            })
            if (res.ok) {
                const data = await res.json()
                setData(data)
            }
        }

        fetchData()
    }, [])

    if (data === null) {
        return <h1>loading...</h1>
    }
    console.log(data)
    return (
        <div className='post'>
            <UserData data={data.userInfo} />
            <PostData data={data.post} />
            {data.commentUserInfo.map((item, index) => {
                return <div className='post__comment' key={index}>
                    <CommentUserInfo data={item} key={index} />
                    <CommentData data={data.comments[index]} key={index} />
                </div>

            })}
        </div>
    )

}

export default SoloPost;
