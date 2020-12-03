import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ExplorePagePost.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Loading from '../Loading/Loading';

const ExplorePagePost = ({ post }) => {

    const fetchWithCSRF = useSelector(state => state.auth.csrf)
    const [user, setUser] = useState(null)
    const [hovering, setHovering] = useState(false)
    const history = useHistory()


    const handleMouseHover = () => {
        setHovering(!hovering)
    }

    useEffect(() => {
        async function fetchData() {
            const res = await fetchWithCSRF(`api/post/${post.userId}/user`, {
                method: 'GET'
            })

            if (res.ok) {
                const data = await res.json()
                setUser(data.user)
            }
        }

        fetchData()

    }, [fetchWithCSRF, post.userId])

    const routeChange = () => {
        history.push(`/post/${post.id}`)
    }

    if (user === null) {
        return <Loading />
    }

    return (
        <div className='explore-post' >
            <img src={post.img} alt='Not found' onClick={routeChange} onMouseEnter={handleMouseHover} onMouseLeave={handleMouseHover} />
            <div className='img-hover'>
                {hovering ?
                    <>
                        {user.profileImg ? <img src={user.profileImg} alt='' /> : <AccountCircleIcon className='no-image' />}
                        <h1>{user.username}</h1>
                    </>
                    : null}
            </div>

        </div>
    )
}

export default ExplorePagePost;
