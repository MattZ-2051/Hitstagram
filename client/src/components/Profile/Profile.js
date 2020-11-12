import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useHistory } from 'react-router-dom';
import './Profile.css';
import ProfilePost from './ProfilePost';

const Profile = () => {

    const user = useSelector(state => state.auth)
    const history = useHistory();
    const fetchWithCSRF = useSelector(state => state.auth.csrf)
    const [counts, setCounts] = useState(null)
    const posts = useSelector(state => state.posts.posts.loggedInUserPost)

    const routeChange = () => {
        history.push(`/profile/${user.id}/edit`)
    }



    useEffect(() => {
        async function fetchData() {
            const res = await fetchWithCSRF(`/api/number/${user.id}/counts`, {
                method: "GET"
            })
            if (res.ok) {
                const data = await res.json()
                setCounts(data)
            }
        }
        fetchData()
    }, [])

    if (counts === null) {
        return <h1>loading...</h1>
    }


    return (
        <>
            <div className='profile'>
                <div className='profile__img'>
                    {user.profileImg ? <img className='profile__img__pic' src={user.profileImg} alt='' /> : <AccountCircleIcon className='profile__img__pic' />}
                </div>
                <div>
                    <div className='profile__username-edit'>
                        <div className='profile__username'>
                            {user.username}
                        </div>
                        <div className='profile__edit'>
                            <button className='profile__editBtn' onClick={routeChange}>Edit Profile</button>
                        </div>
                    </div>
                    <div className='counts'>
                        <div className='counts__post'>
                            Posts: <span>{counts.postCount}</span>
                        </div>
                        <div className='counts__followers'>
                            Followers: <span>{counts.followerCount}</span>
                        </div>
                    </div>
                    <div className='profile__name'>
                        {user.fullName}
                    </div>
                    <div className='profile__bio'>
                        {user.bio ? user.bio : <p>No bio yet!</p>}
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

export default Profile;
