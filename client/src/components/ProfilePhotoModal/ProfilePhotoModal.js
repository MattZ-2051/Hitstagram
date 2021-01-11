import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "./AddChannelModal.css";
import { useDispatch, useSelector } from "react-redux";
import { newChannel } from "../../store/channels";
import AddIcon from "@material-ui/icons/Add";

const iconStyle = {
  fontSize: "20px",
};

function getModalStyle() {
  const top = 46;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    height: 175,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function AddChannelModal() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [channelName, setChannelName] = useState("");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = () => {
    dispatch(newChannel({ channelName, userId }));
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Create a channel</h2>
      <div className="modal-input">
        <input type="text" onChange={(e) => setChannelName(e.target.value)} />
      </div>
      <div className="createButton">
        <button onClick={handleCreate}>Create</button>
      </div>
      <div className="createButton">
        <button onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );

  return (
    <div className="modal-btn">
      <AddIcon style={iconStyle} className="add-icon" />
      <button type="button" onClick={handleOpen}>
        Add Channel
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
