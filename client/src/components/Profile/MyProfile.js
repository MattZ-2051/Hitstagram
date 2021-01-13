import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";
import "./MyProfile.css";
import ProfilePost from "./ProfilePost";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Modal from "@material-ui/core/Modal";

export function ProfilePhotoModal() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [photoFile, setPhotoFile] = useState(null);
  const userId = useSelector((state) => state.auth.id);
  const history = useHistory();
  const [imgPreview, setImgPreview] = useState(null);

  const handleChange = (e) => {
    setPhotoFile(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const postPhoto = async (formData) => {
    //   dispatch(updateProfile(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", photoFile);
    await postPhoto(formData);

    setTimeout(() => {
      history.push(`/my/profile/${userId}`);
    }, 1000);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <>
      <div className="upload-modal">
        <form className="upload-form" onSubmit={handleSubmit}>
          <p>Changle Profile Picture</p>
          <label htmlFor="file" id="file-input">
            <input
              className="upload-form__input"
              onChange={handleChange}
              type="file"
              name="file"
              id="file-input"
            />
            Upload Photo
          </label>
          <div className="upload-form__btn-div">
            <button className="upload-form__btn">Upload</button>
            <button className="upload-form__btn">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );

  return (
    <div className="modal-btn">
      <div className="profile__img">
        {user.profileImg ? (
          <img
            className="profile__img__pic"
            src={user.profileImg}
            onClick={handleOpen}
            alt=""
          />
        ) : (
          <AccountCircleIcon className="profile__img__pic" />
        )}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

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
