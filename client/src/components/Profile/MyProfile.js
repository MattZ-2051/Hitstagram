import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./MyProfile.css";
import ProfilePost from "./ProfilePost";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProfilePhotoModal from "../ProfilePhotoModal/ProfilePhotoModal";

const MyProfile = () => {
  const user = useSelector((state) => state.auth);
  const [counts, setCounts] = useState(null);
  const posts = useSelector((state) => state.posts.loggedInUserPost);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/number/${user.id}/counts`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setCounts(data);
      }
    }
    fetchData();
  }, [fetch, user.id]);

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

export default MyProfile;
