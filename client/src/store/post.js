const GETPOST = 'POST/GETPOST'
const NEWPOST = 'POST/NEWPOST'

export const setPosts = (posts) => {
    return {
        type: GETPOST,
        posts
    }
}

export const newPost = (post) => {
    return {
        type: NEWPOST,
        post
    }
}

export const posts = (userId) => {
    return async (dispatch, getState) => {

        const fetchWithCSRF = getState().auth.csrf
        const res = await fetchWithCSRF(`/api/post/${userId}/feed`, {
            method: "GET"
        })
        if (res.ok) {
            const data = await res.json()
            dispatch(setPosts(data))
        }
    }
}

export const newUserPost = (userId, formData) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().auth.csrf
        const res = await fetchWithCSRF(`/api/post/${userId}/upload`, {
            method: 'POST',
            body: formData
        })
        if (res.ok) {
            const data = await res.json()
            dispatch(newPost(data.photo))
        }
    }
}


export default function reducer(state = {}, action) {
    switch (action.type) {
        case GETPOST:
            return { ...action.posts }
        case NEWPOST:
            console.log(state)
            return { ...state, 'loggedInUserPost': [...state.loggedInUserPost, action.post] }
        default:
            return state
    }
}
