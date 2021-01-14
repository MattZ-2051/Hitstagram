import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MyProfile.css";
import ProfilePost from "./ProfilePost";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProfilePhotoModal from "../ProfilePhotoModal/ProfilePhotoModal";

const MyProfile = () => {
  const user = useSelector((state) => state.auth);
  const history = useHistory();
  const fetchWithCSRF = useSelector((state) => state.auth.csrf);
  const [counts, setCounts] = useState(null);
  const posts = useSelector((state) => state.posts.loggedInUserPost);
  const [open, setOpen] = useState(false);

  const routeChange = () => {
    history.push(`/profile/${user.id}/edit`);
  };

  const profilePicRoute = () => {
    // history.push(`/profile/img/${user.id}/upload`);
    // setOpen(true);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetchWithCSRF(`/api/number/${user.id}/counts`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setCounts(data);
      }
    }
    fetchData();
  }, [fetchWithCSRF, user.id]);

  if (counts === null) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <div className="profile">
        <ProfilePhotoModal />
        <div>
          <div className="profile__username-edit grid">
            <div className="profile__username">{user.username}</div>
            <div className="profile__edit">
              <EditProfileModal className="profile__editBtn" />
            </div>
          </div>
          <div className="counts grid">
            <div className="counts__post">
              Posts <span>{counts.postCount}</span>
            </div>
            <div className="counts__following">
              Following <span>{counts.followingCount}</span>
            </div>
            <div className="counts__followers">
              Followers <span>{counts.followersCount}</span>
            </div>
          </div>
          <div className="profile__name grid">
            <span>Name </span>
            {user.fullName}
          </div>
          <div className="profile__bio grid">
            <span>Bio </span>
            {user.bio ? user.bio : <p>No bio yet!</p>}
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

export default MyProfile;
