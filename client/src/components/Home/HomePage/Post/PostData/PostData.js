import React from 'react';

const PostData = ({ data }) => {

    return (
        <div className='post'>
            <div className='post__img'>
                <img src={data.img} alt='Image could not be found' />
            </div>
            <div className='post__caption'>
                {data.caption}
            </div>

        </div>
    )
}

export default PostData
