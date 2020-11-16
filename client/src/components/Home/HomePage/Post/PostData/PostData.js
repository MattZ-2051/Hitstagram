import React from 'react';
import './PostData.css'
import StarsIcon from '@material-ui/icons/Stars';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { useHistory } from 'react-router-dom';

const PostData = ({ data }) => {

    const history = useHistory()

    const routeChange = () => {
        history.push(`/post/${data.id}`)
    }

    const handleFavorite = () => {

    }

    return (
        <div className='postData'>
            <img src={data.img} alt='Image could not be found' onClick={routeChange} />
            <div className='postData__caption'>
                <StarsIcon className='postData__star' onClick={handleFavorite} />
                {data.caption}
            </div>
        </div>
    )
}

export default PostData
