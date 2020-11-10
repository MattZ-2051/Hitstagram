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
        const res = await fetchWithCSRF(`/api/post/${userId}/feed`, {
            method: "GET"
        })
        if (res.ok) {
            const data = await res.json()
            dispatch(setPosts(data))
        }
    }
}


export default function reducer(state = {}, action) {
    switch (action.type) {
        case GETPOST:
            return { 'posts': action.posts, 'userInfo': action.userInfo, 'postComments': action.postComments, 'commentUserInfo': action.postCommentUserInfo }

        default:
            return state
    }
}
