import React, { useEffect, useState } from 'react';
import './PostData.css';
import StarsIcon from '@material-ui/icons/Stars';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommentData from '../CommentData/CommentData';
import CommentUserInfo from '../CommentUserInfo/CommentUserInfo';


const PostData = ({ data }) => {

    const [comment, setComment] = useState('')
    const userId = useSelector(state => state.auth.id);
    const fetchWithCSRF = useSelector(state => state.auth.csrf);
    const [commentsData, setCommentsData] = useState([]);
    const [commentUser, setCommentUser] = useState([]);
    const [hidden, setHidden] = useState(true)


    const newComment = async () => {
        const res = await fetchWithCSRF(`/api/post/${data.id}/${userId}/comment`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comment)
        })
        if (res.ok) {
            const data = await res.json()
            commentsData.push(data.comment)
            commentUser.push(data.user)
        }
    }

    const handleComment = (e) => {
        e.preventDefault()
        newComment()
        setComment('')
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetchWithCSRF(`/api/post/${data.id}/post/comments`, {
                methods: 'GET'
            })
            if (res.ok) {
                const data = await res.json()
                setCommentsData(data.comments)
                setCommentUser(data.userInfo)
            }
        }

        fetchData()
    }, [])

    const commentViewChange = () => {
        if (hidden === true) {
            setHidden(false)
        } else {
            setHidden(true)
        }
    }

    const history = useHistory()

    const routeChange = () => {
        history.push(`/post/${data.id}`)
    }

    const handleFavorite = () => {

    }

    if (commentsData.length === 0 || commentUser.length === 0) {
        return <h1>loading...</h1>
    }
    return (
        <div className='postData'>
            <img src={data.img} alt='Image could not be found' onClick={routeChange} />
            <div className='postData__caption'>
                <StarsIcon className='postData__star' onClick={handleFavorite} />
                <div>
                    {data.caption}
                </div>
            </div>
            <button className='viewCommentBtn' onClick={commentViewChange}>View Comments</button>
            <div className='comment' hidden={hidden}>
                {commentsData.map((item, index) => {
                    return (
                        <div key={index} className='post__comment'>
                            <CommentUserInfo data={commentUser[index]} />
                            <CommentData data={item} />
                        </div>
                    )
                })}
            </div>
            <div className='comment-form-div'>
                <form onSubmit={handleComment} className='comment-form'>
                    <input value={comment} className='post__comment__input' type='text' placeholder='Add a comment...' onChange={(e) => setComment(e.target.value)} />
                    <button type='submit' hidden={true} className='comment-btn'></button>
                </form>
            </div>
        </div>
    )
}

export default PostData
