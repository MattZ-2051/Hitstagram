import React, { useState } from 'react';
import './CommentData.css';
import { useDispatch, useSelector } from 'react-redux';
import { newUserComment } from '../../../../../store/post'

const CommentData = ({ data }) => {

    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.id)

    const handleComment = (e) => {
        e.preventDefault()
        console.log(data.id)
        dispatch(newUserComment(userId, data.id, comment))
        setComment('')
    }
    return (
        <div className='comments-div'>
            <div className='comments'>
                {data.content}
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

export default CommentData
