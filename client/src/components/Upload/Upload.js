import React, { useState } from "react";
import "./Upload.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { newUserPost } from "../../store/post";
import NavBar from "../NavBar/NavBar";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: "250px",
    color: "lightblue",
  },
}));

const Upload = () => {
  const classes = useStyles();
  const [photoFile, setPhotoFile] = useState(null);
  const userId = useSelector((state) => state.auth.id);
  const history = useHistory();
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState(null);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    setPhotoFile(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setPhotoFile(null);
    setImgPreview(null);
  };

  const postPhoto = async (formData) => {
    dispatch(newUserPost(userId, formData));
    if (photoFile === null) return;
    setTimeout(() => {
      history.push(`my/profile/${userId}`);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const obj = { caption: caption };
    const json = JSON.stringify(obj);
    const blob = new Blob([json], {
      type: "application/json",
    });
    formData.append("caption", blob);
    formData.append("file", photoFile);
    await postPhoto(formData);
  };

  return (
    <>
      <NavBar />
      <div className="upload">
        <p className="upload__title">Select a photo to upload</p>
        <div className="upload-img-preview">
          {imgPreview ? (
            <img src={imgPreview} alt="Not Found" />
          ) : (
            <ImageOutlinedIcon className={classes.icon} />
          )}
        </div>

        <form className="upload-form" onSubmit={handleSubmit}>
          <input
            className="upload-form__input"
            onChange={handleChange}
            id="contained-button"
            type="file"
            name="file"
          />

          <div className="upload-form__caption">
            <label htmlFor="caption">Caption</label>
            <input
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              name="caption"
              placeholder="Add a caption to your photo"
            />
          </div>
          <div className="upload-form__btn-div">
            {imgPreview ? (
              <button className="upload-form__btn" onClick={handleSubmit}>
                Confirm
              </button>
            ) : (
              <label htmlFor="contained-button">
                <span className="upload__btn-span">Upload</span>
              </label>
            )}
          </div>
          <button className="cancel-form__btn" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default Upload;
