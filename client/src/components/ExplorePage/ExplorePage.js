import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ExplorePage = () => {


    const fetchWithCSRF = useSelector(state => state.auth.csrf)
    const [posts, setPosts] = useState(null)

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
    }, [])

    if (posts === null) {
        return <h1>loading...</h1>
    }

    console.log(posts)

    return (
        <div className='explore-page'>
            {posts.map((item, index) => {
                return (
                    <div className='explore-page__post' key={index}>
                        <img src={item.img} />
                    </div>
                )
            })}
        </div>
    )
}

export default ExplorePage;
