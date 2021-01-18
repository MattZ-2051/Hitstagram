const GETPOST = "POST/GETPOST";
const NEWPOST = "POST/NEWPOST";

export const setPosts = (posts) => {
  return {
    type: GETPOST,
    posts,
  };
};

export const newPost = (post) => {
  return {
    type: NEWPOST,
    post,
  };
};

export const posts = (userId) => {
  return async (dispatch, getState) => {
    const res = await fetch(`/api/post/${userId}/feed`, {
      method: "GET",
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(setPosts(data));
    }
  };
};

export const newUserPost = (userId, formData) => {
  return async (dispatch) => {
    const XSRFTOKEN = await fetch("/api/session/get_csrf");
    const token = await XSRFTOKEN.json();
    const res = await fetch(`/api/post/${userId}/upload`, {
      method: "POST",
      headers: {
        "X-CSRFToken": token.csrfT,
      },
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(newPost(data.photo));
    }
  };
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GETPOST:
      return { ...action.posts };
    case NEWPOST:
      return {
        ...state,
        loggedInUserPost: [...state.loggedInUserPost, action.post],
      };
    default:
      return state;
  }
}
