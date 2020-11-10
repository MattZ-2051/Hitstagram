import React from 'react';

const CommentData = ({ data }) => {

    return (
        <div className='comments'>
            {data.content}
        </div>
    )
}

export default CommentData
