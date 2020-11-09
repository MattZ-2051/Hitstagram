import React from 'react';

const Post = ({ data }) => {

    return (
        <div className='post'>
            {data.caption}
        </div>
    )
}

export default Post;
