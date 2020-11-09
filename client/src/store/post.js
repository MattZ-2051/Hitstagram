const GETPOST = 'POST/GETPOST'

export const setPosts = (posts) => {
    return {
        type: GETPOST,
        posts
    }
}

export const posts = (userId) => {
    return async (dispatch, getState) => {

        const fetchWithCSRF = getState().auth.csrf
        console.log(userId)
        const res = await fetchWithCSRF(`/api/post/${userId}/feed`, {
            method: "GET"
        })
        if (res.ok) {
            const { posts } = await res.json()
            dispatch(setPosts(posts))
        }
    }
}


export default function reducer(state = [], action) {
    switch (action.type) {
        case GETPOST:
            return [...state, ...action.posts]

        default:
            return state
    }
}
