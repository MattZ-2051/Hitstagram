import React from 'react';
import './PostData.css'
import StarsIcon from '@material-ui/icons/Stars';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

const PostData = ({ data }) => {

    return (
        <div className='postData'>
            <img src={data.img} alt='Image could not be found' />
            <div className='postData__caption'>
                <StarsIcon className='postData__star' />
                <ChatBubbleOutlineIcon className='postData__commentBtn' />
                {data.caption}
            </div>
        </div>
    )
}

export default PostData
