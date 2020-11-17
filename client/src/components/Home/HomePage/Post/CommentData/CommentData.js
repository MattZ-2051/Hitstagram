import React, { useState } from 'react';
import './CommentData.css';


const CommentData = ({ data }) => {

    return (
        <div className='comments-div'>
            <div className='comments'>
                {data.content}
            </div>

        </div>
    )
}

export default CommentData
