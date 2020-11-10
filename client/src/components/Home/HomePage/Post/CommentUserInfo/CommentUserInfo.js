import React from 'react';


const CommentUserInfo = ({ data }) => {

    return (
        <div className='userComment'>
            {data.username}
            {data.fullName}
        </div>
    )
}

export default CommentUserInfo
