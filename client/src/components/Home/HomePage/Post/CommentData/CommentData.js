import React from 'react';
import './CommentData.css';

const CommentData = ({ data }) => {

    return (
        <div className='comments'>
            {data.content}
        </div>
    )
}

export default CommentData
