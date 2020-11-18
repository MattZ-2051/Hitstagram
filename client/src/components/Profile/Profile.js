import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './MyProfile.css'
import ProfilePost from './ProfilePost';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const Profile = () => {

    const history = useHistory()
    const userId = history.location.pathname.split('/')[2]
    const fetchWithCSRF = useSelector(state => state.auth.csrf)
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [counts, setCounts] = useState(null)
    const loggedInUserId = useSelector(state => state.auth.id)
    const [checkFollow, setCheckFollow] = useState(true)

    useEffect(() => {

        async function fetchFollow() {
            const res = await fetchWithCSRF(`/api/follow/${loggedInUserId}/add/${userId}`, {
                method: 'GET'
            })

            if (res.ok) {
                const data = await res.json()
                if (data.follow === true) {
                    setCheckFollow(true)
                } else {
                    setCheckFollow(false)
                }
            }
        }

        async function fetchData() {
            const res = await fetchWithCSRF(`/api/post/${userId}/profile`, {
                method: 'GET'
            })
            if (res.ok) {
                const data = await res.json()
                setUser(data.userInfo)
                setPosts(data.posts)
            }
        }

        fetchFollow()
        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            const res = await fetchWithCSRF(`/api/number/${userId}/counts`, {
                method: "GET"
            })
            if (res.ok) {
                const data = await res.json()
                setCounts(data)
            }
        }
        fetchData()
    }, [])

    if (user.length === 0 || Object.keys(posts).length === 0 || counts === null) {
        return <h1>loading...</h1>
    }

    const handleFollow = async () => {

        if (checkFollow === false) {


            const res = await fetchWithCSRF(`/api/follow/${loggedInUserId}/add/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.ok) {
                const data = await res.json()
                console.log(data)
            }
        } else {
            const res = await fetchWithCSRF(`/api/follow/${loggedInUserId}/add/${userId}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                const data = res.json()
            }
        }
    }

    const handleClick = () => {
        handleFollow()
    }

    console.log(checkFollow)

    return (
        <>
            <div className='profile'>
                <div className='profile__img'>
                    {user.profileImg ? <img className='profile__img__pic' src={user.profileImg} alt='' /> : <AccountCircleIcon className='profile__img__pic' />}
                </div>
                <div>
                    <div className='profile__username-edit grid'>
                        <div className='profile__username'>
                            {user.username}
                        </div>
                        <div className='profile__edit'>
                            <button className='profile__editBtn' onClick={handleClick} hidden={!checkFollow}>Unfollow</button>
                            <button className='profile__editBtn' onClick={handleClick} hidden={checkFollow}>Follow</button>
                        </div>
                    </div>
                    <div className='counts grid'>
                        <div className='counts__post'>
                            Posts: <span>{counts.postCount}</span>
                        </div>
                        <div className='counts__following'>
                            Following: <span>{counts.followingCount}</span>
                        </div>
                        <div className='counts__followers'>
                            Followers: <span>{counts.followersCount}</span>
                        </div>
                    </div>
                    <div className='profile__name grid'>
                        <span>Name: </span>{user.fullName}
                    </div>
                    <div className='profile__bio grid'>
                        <span>Bio: </span>{user.bio ? user.bio : <p>No bio yet!</p>}
                    </div>
                </div>
            </div>
            <div className='profile__posts'>
                {posts.map((item, index) => {
                    return <ProfilePost post={item} key={index} />
                })}
            </div>
        </>
    )
}

export default Profile
