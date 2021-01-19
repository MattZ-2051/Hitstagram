const SET_USER = "AUTH/SETUSER";
const REMOVE_USER = "AUTH/REMOVEUSER";
const SET_CSRF = "AUTH/SETCSRF";
const UPDATE_USER = "AUTH/UPDATEUSER";
const UPDATE_PROFILE_IMG = "AUTH/UPDATE_PROFILE_IMG";
const LOAD_USER = "AUTH/LOAD_USER";

export const newProfileImg = (user) => {
  return {
    type: UPDATE_PROFILE_IMG,
    user,
  };
};

export const userLoad = (user) => {
  return {
    type: LOAD_USER,
    user,
  };
};

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const setCsrfFunc = (cb) => {
  return {
    type: SET_CSRF,
    cb,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// export const logout = () => (dispatch, getState) => {
//   const fetchWithCSRF = getState().auth.csrf;
//   fetchWithCSRF(`/api/session/logout`, {
//     method: "POST",
//   }).then(() => dispatch(removeUser()));
// };

export const logout = () => async (dispatch) => {
  const XSRFTOKEN = await fetch("/api/session/get_csrf");
  const token = await XSRFTOKEN.json();

  const res = await fetch("/api/session/logout", {
    method: "POST",
    headers: {
      "X-CSRFToken": token.csrfT,
    },
  });
  if (res.ok) {
    dispatch(removeUser());
  }
};

export const loadUser = () => async (dispatch) => {
  const res = await fetch("/api/session/load");
  if (res.ok) {
    const user = await res.json();
    dispatch(userLoad(user));
  }
};

// export const login = (username, password) => {
//     return async (dispatch, getState) => {
//         const fetchWithCSRF = getState().auth.csrf;
//         const res = await fetchWithCSRF('/api/session/login', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             credentials: 'include',
//             body: JSON.stringify({ username, password })
//         })
//         if (res.ok) {
//             const { user } = await res.json();
//             dispatch(setUser(user));
//         }

//     }
// }

export const login = (username, password) => {
  return async (dispatch) => {
    const XSRFTOKEN = await fetch("/api/session/get_csrf");
    const token = await XSRFTOKEN.json();

    const response = await fetch(`/api/session/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": token.csrfT,
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const user = await response.json();
      dispatch(setUser(user));
    }
  };
};

// export const signup = (fullName, username, password) => {
//   return async (dispatch, getState) => {
//     const fetchWithCSRF = getState().auth.csrf;
//     const res = await fetchWithCSRF("/api/session/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ fullName, username, password }),
//     });
//     if (res.ok) {
//       const { user } = await res.json();
//       dispatch(setUser(user));
//     }
//   };
// };

export const signup = (fullName, username, password, confirmpassword) => async (
  dispatch
) => {
  const XSRFTOKEN = await fetch("/api/session/get_csrf");
  const token = await XSRFTOKEN.json();

  const response = await fetch(`/api/session/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": token.csrfT,
    },
    body: JSON.stringify({ fullName, username, password, confirmpassword }),
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setUser(user));
  }
};

export const userUpdate = (fullName, bio) => {
  return async (dispatch, getState) => {
    const XSRFTOKEN = await fetch("/api/session/get_csrf");
    const token = await XSRFTOKEN.json();
    const user = getState().auth;
    const res = await fetch(`/api/users/${user.id}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": token.csrfT,
      },
      body: JSON.stringify({ fullName, bio }),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(updateUser(data.user));
    }
  };
};

export const updateProfile = (formData) => {
  return async (dispatch, getState) => {
    const XSRFTOKEN = await fetch("/api/session/get_csrf");
    const token = await XSRFTOKEN.json();
    const user = getState().auth;
    const res = await fetch(`/api/post/${user.id}/upload/profileImg`, {
      method: "PATCH",
      headers: {
        "X-CSRFToken": token.csrfT,
      },
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(newProfileImg(data.user));
    }
  };
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOAD_USER:
      return { ...state, ...action.user };
    case SET_USER:
      return { ...state, ...action.user };
    case SET_CSRF:
      return { ...state, csrf: action.cb };
    case REMOVE_USER:
      return {};
    case UPDATE_USER:
      return { ...state, ...action.user };
    case UPDATE_PROFILE_IMG:
      return { ...state, ...action.user };
    default:
      return state;
  }
}
