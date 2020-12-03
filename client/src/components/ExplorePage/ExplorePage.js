import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from '../Loading/Loading';
import NavBar from '../NavBar/NavBar';
import './ExplorePage.css';
import ExplorePagePost from './ExplorePagePost';

const ExplorePage = () => {


    const fetchWithCSRF = useSelector(state => state.auth.csrf)
    const [posts, setPosts] = useState(null)
    const user = useSelector(state => state.auth.id)

    useEffect(() => {
        async function fetchData() {
            const res = await fetchWithCSRF('api/post/explore/posts', {
                method: 'GET'
            })

            if (res.ok) {
                const data = await res.json()
                setPosts(data.posts)
            }
        }
        fetchData()
    }, [fetchWithCSRF])

    if (posts === null) {
        return <Loading />
    }

    return (
        <>
            <NavBar />
            <div className='explore-page'>
                {posts.map((item, index) => {
                    if (item.userId !== user) {
                        return (
                            <div className='explore-page__post' key={index}>
                                <ExplorePagePost post={item} />
                            </div>
                        )
                    } else {
                        return null
                    }
                })}
            </div>
        </>
    )
}

export default ExplorePage;
