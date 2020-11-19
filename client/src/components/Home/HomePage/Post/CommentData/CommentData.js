import React, { useEffect, useState } from 'react';
import './CommentData.css';
import { useSelector } from 'react-redux';

const CommentData = ({ data }) => {

    const userId = useSelector(state => state.auth.id)
    const [hidden, setHidden] = useState(true)
    const fetchWithCSRF = useSelector(state => state.auth.csrf)

    const handleDelete = (e) => {
        e.preventDefault()
        deleteComment()
    }

    useEffect(() => {
        if (userId === data.userId) {
            setHidden(false)
        }
    }, [])

    const deleteComment = async () => {
        const res = await fetchWithCSRF(`/api/post/${data.postId}/${userId}/comment`, {
            method: 'DELETE'
        })
        if (res.ok) {
            return 'message deleted'
        }
    }


    return (
        <>
            <div className='comments-div'>
                <div className='comments'>
                    {data.content}
                </div>
            </div>
            <div className='comments-deleteBtn'>
                <button type='submit' hidden={hidden} onClick={handleDelete}>Delete</button>
            </div>
        </>

    )
}

export default CommentData
