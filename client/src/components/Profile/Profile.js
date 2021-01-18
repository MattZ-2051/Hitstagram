import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MyProfile.css";
import ProfilePost from "./ProfilePost";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";

const Profile = () => {
  const history = useHistory();
  const userId = history.location.pathname.split("/")[2];
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [counts, setCounts] = useState(null);
  const loggedInUserId = useSelector((state) => state.auth.id);
  const [checkFollow, setCheckFollow] = useState(true);

  useEffect(() => {
    async function fetchFollow() {
      const res = await fetch(`/api/follow/${loggedInUserId}/add/${userId}`, {
        method: "GET",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.follow === true) {
          setCheckFollow(true);
        } else {
          setCheckFollow(false);
        }
      }
    }

    async function fetchData() {
      const res = await fetch(`/api/post/${userId}/profile`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.userInfo);
        setPosts(data.posts);
      }
    }

    fetchFollow();
    fetchData();
  }, [fetch, loggedInUserId, userId]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/number/${userId}/counts`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setCounts(data);
      }
    }
    fetchData();
  }, [fetch, userId]);

  if (user.length === 0 || Object.keys(posts).length === 0 || counts === null) {
    return <Loading />;
  }

  const handleFollow = async () => {
    const XSRFTOKEN = await fetch("/api/session/get_csrf");
    const token = await XSRFTOKEN.json();
    if (checkFollow === false) {
      const res = await fetch(`/api/follow/${loggedInUserId}/add/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token.csrfT,
        },
      });
      if (res.ok) {
        return;
      }
    } else {
      const res = await fetch(`/api/follow/${loggedInUserId}/add/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": token.csrfT,
        },
      });
      if (res.ok) {
        return;
      }
    }
  };

  const handleClick = () => {
    handleFollow();
    setCheckFollow(!checkFollow);
  };

  return (
    <>
      <NavBar />
      <div className="profile">
        <div className="profile__img">
          {user.profileImg ? (
            <img className="profile__img__pic" src={user.profileImg} alt="" />
          ) : (
            <AccountCircleIcon className="profile__img__pic" />
          )}
        </div>
        <div>
          <div className="profile__username-edit grid">
            <div className="profile__username">{user.username}</div>
            <div className="profile__edit">
              <button
                className="profile__editBtn"
                onClick={handleClick}
                hidden={!checkFollow}
              >
                Unfollow
              </button>
              <button
                className="profile__editBtn"
                onClick={handleClick}
                hidden={checkFollow}
              >
                Follow
              </button>
            </div>
          </div>

          <div className="profile__name grid">{user.fullName}</div>
          <div className="profile__bio grid">
            {user.bio ? user.bio : <p>No bio yet!</p>}
          </div>
          <div className="counts">
            <div className="counts__post">{counts.postCount} Posts</div>
            <div className="counts__following">
              {counts.followingCount} Following
            </div>
            <div className="counts__followers">
              {counts.followersCount} Followers
            </div>
          </div>
        </div>
      </div>
      <div className="profile__posts">
        {posts.map((item, index) => {
          return <ProfilePost post={item} key={index} />;
        })}
      </div>
    </>
  );
};

export default Profile;
