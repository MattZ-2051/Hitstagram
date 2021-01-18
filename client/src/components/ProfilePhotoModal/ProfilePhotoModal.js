import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const [imgPreview, setImgPreview] = useState(null);

  const handleChange = (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setPhotoFile(e.target.files[0]);
  };

  const postPhoto = async (formData) => {
    dispatch(updateProfile(formData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", photoFile);
    await postPhoto(formData);

    setTimeout(() => {
      setOpen(false);
    }, 1000);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
    setPhotoFile(null);
    setImgPreview(null);
  };

  const body = (
    <>
      <div className="upload-modal">
        <form className="upload-modal__form" onSubmit={handleSubmit}>
          <p>Changle Profile Picture</p>
          {imgPreview ? (
            <div className="profile__img-modal">
              <img className="profile__img__pic" src={imgPreview} alt="" />
            </div>
          ) : null}

          <input
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={handleChange}
          />

          <div className="upload-modal__btn-div">
            <label htmlFor="contained-button-file">
              {photoFile ? (
                <span className="upload-modal__btn-span" onClick={handleSubmit}>
                  Submit
                </span>
              ) : (
                <span className="upload-modal__btn-span">Upload</span>
              )}
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
