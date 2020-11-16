import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

    useEffect(() => {

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

    console.log(counts)

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
                            <button className='profile__editBtn'>Edit Profile</button>
                        </div>
                    </div>
                    <div className='counts grid'>
                        <div className='counts__post'>
                            Posts: <span>{counts.postCount}</span>
                        </div>
                        <div className='counts__followers'>
                            Followers: <span>{counts.followerCount}</span>
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
