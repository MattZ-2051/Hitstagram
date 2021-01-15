import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { useDispatch, useSelector } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { userUpdate } from "../../store/auth";
import { useHistory } from "react-router-dom";
import "./EditProfileModals.css";

export default function ProfilePhotoModal() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth);
  const [fullName, setFullName] = useState(user.fullName);
  const [bio, setBio] = useState(user.bio);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userUpdate(fullName, bio));
    history.push(`/my/profile/${user.id}`);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setBio("");
    setFullName("");
  };

  const body = (
    <>
      <div className="edit-page">
        <div className="edit-page__info">
          <div className="edit-page__profileImg">
            {user.profileImg ? (
              <img
                className="profile__img__pic"
                src={user.profileImg}
                alt="Not found"
              />
            ) : (
              <AccountCircleIcon />
            )}
          </div>
          <div className="edit-page__username">{user.username}</div>
        </div>
        <div className="edit-form">
          <form onSubmit={handleSubmit}>
            <div className="edit-form__name">
              <div className="edit-form__label">
                <label htmlFor="name">Name</label>
              </div>
              <div className="edit-form__input">
                <input
                  type="text"
                  placeholder={user.fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
            <div className="edit-form__bio">
              <div className="edit-form__label">
                <label htmlFor="bio">Bio</label>
              </div>
              <div className="edit-form__input edit-form__input-bio">
                <input
                  type="text"
                  placeholder={user.bio ? user.bio : "No bio yet!"}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
            <div className="edit-form__submitBtn">
              <button type="submit">Submit</button>
              <div>
                <button onClick={handleClose}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );

  return (
    <div className="modal-btn">
      <button type="button" onClick={handleOpen}>
        Edit Profile
      </button>
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
