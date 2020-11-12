import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SoloPost = () => {

    const posts = useSelector(state => state.posts.posts.loggedInUserPost)
    const history = useHistory()
    const [data, setData] = useState(null)
    const postId = history.location.pathname.split('/')[4];


    if (posts === undefined) {
        return <h1>loading...</h1>
    }

    return (
        <h1>post page</h1>
    )

}

export default SoloPost;
