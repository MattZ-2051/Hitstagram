import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ExplorePagePost.css';

const ExplorePagePost = ({ post }) => {

    const fetchWithCSRF = useSelector(state => state.auth.csrf)
    const [user, setUser] = useState(null)
    const history = useHistory()

    useEffect(() => {
        async function fetchData() {
            const res = await fetchWithCSRF(`api/post/${post.userId}/user`, {
                method: 'GET'
            })

            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setUser(data.user)
            }
        }

        fetchData()

    }, [])

    const routeChange = () => {
        history.push(`/post/${post.id}`)
    }

    if (user === null) {
        return <h1>loading...</h1>
    }

    return (
        <div className='explore-post'>
            <img src={post.img} alt='image not found' onClick={routeChange} />
        </div>
    )
}

export default ExplorePagePost;
