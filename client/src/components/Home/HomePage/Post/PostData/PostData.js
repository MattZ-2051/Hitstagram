import React from 'react';
import './PostData.css'

const PostData = ({ data }) => {

    return (
        <div className='postData'>
            <img src={data.img} alt='Image could not be found' />
            <div className='postData__caption'>
                {data.caption}
            </div>
        </div>
    )
}

export default PostData
