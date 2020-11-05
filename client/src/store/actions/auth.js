import * as actionTypes from './actionTypes';
import Cookie from 'js-cookie'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const setCsrfFunc = (cb) => {
    return {
        type: SET_CSRF,
        cb
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        user
    }
}

export const logout = () => (dispatch, getState) => {
    const fetchWithCSRF = getState().authentication.csrf;
    fetchWithCSRF(`/api/session/logout`, {
        method: 'POST'
    }).then(() => dispatch(authLogout()));
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
        const fetchWithCSRF = getState().authentication.csrf;
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
            dispatch(authSuccess(user));
        }

    }
}

export const signup = (fullName, username, password) => {
    return async (dispatch, getState) => {
        const fetchWithCSRF = getState().authentication.csrf;
        const res = await fetchWithCSRF('/api/session/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, username, password })
        })

        if (res.status === 400) {
            const { errors } = await res.json();
            dispatch(authFail(errors))
        }

        if (res.ok) {
            const { user } = await res.json();
            dispatch(authSuccess(user))
        }

    }
}
