import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./ProfilePhotoModal.css";
import { makeStyles } from "@material-ui/core/styles";
import { updateProfile } from "../../store/auth";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
    color: "black",
  },
}));

function ProfilePhotoModal() {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [photoFile, setPhotoFile] = useState(null);
  const userId = useSelector((state) => state.auth.id);
  const history = useHistory();
  const [imgPreview, setImgPreview] = useState(null);

  const handleChange = (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const postPhoto = async (formData) => {
    dispatch(updateProfile(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPhotoFile(e.target.files[0]);

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

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const body = (
    <>
      <div className="upload-modal">
        <form className="upload-modal__form" onSubmit={handleSubmit}>
          <p>Changle Profile Picture</p>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleSubmit}
          />

          <div className="upload-modal__btn-div">
            <label htmlFor="contained-button-file">
              <span className="upload-modal__btn-span">Upload</span>
            </label>
            <button className="upload-modal__btn" onClick={handleClose}>
              Cancel
            </button>
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

export default ProfilePhotoModal;
