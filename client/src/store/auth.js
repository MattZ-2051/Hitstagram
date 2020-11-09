import Cookies from 'js-cookie'

const SET_USER = 'AUTH/SET_USER'
const REMOVE_USER = 'AUTH/REMOVE_USER'
const SET_CSRF = 'AUTH/SET_CSRF'
const UPDATE_USER = 'AUTH/UPDATE_USER';



export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user
    }
}

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const setCsrfFunc = (cb) => {
    return {
        type: SET_CSRF,
        cb
    }
}


export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
}

export const logout = () => (dispatch, getState) => {
    const fetchWithCSRF = getState().auth.csrf;
    fetchWithCSRF(`/api/session/logout`, {
        method: 'POST'
    }).then(() => dispatch(removeUser()));
}

function loadUser() {
    const authToken = Cookies.get("session");
    if (authToken) {
        try {
            const payload = authToken.split(".")[1];
            const decodedPayload = atob(payload);
            const payloadObj = JSON.parse(decodedPayload);
            const { data } = payloadObj;
            return data;
        } catch (e) {
            Cookies.remove("session");
        }
    }
    return {};
}

export const login = (username, password) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().auth.csrf;
        const res = await fetchWithCSRF('/api/session/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        })
        if (res.ok) {
            const { user } = await res.json();
            dispatch(setUser(user));
        }

    }
}


export const signup = (fullName, username, password) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().auth.csrf;
        const res = await fetchWithCSRF('/api/session/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, username, password })
        })
        if (res.ok) {
            const { user } = await res.json();
            dispatch(setUser(user))
        }

    }
}

export const userUpdate = (fullName, bio) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().auth.csrf;
        const user = getState().auth
        const res = await fetchWithCSRF(`/api/users/${user.id}/edit`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, bio })
        })
        if (res.ok) {
            const data = await res.json()
            dispatch(updateUser(data.user))
        }
    }
}

const initialState = {
    ...loadUser(),
    csrf: fetch,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, ...action.user }
        case SET_CSRF:
            return { ...state, csrf: action.cb }
        case REMOVE_USER:
            return { csrf: state.csrf }
        case UPDATE_USER:
            return { ...state, ...action.user }
        default:
            return state
    }
}
