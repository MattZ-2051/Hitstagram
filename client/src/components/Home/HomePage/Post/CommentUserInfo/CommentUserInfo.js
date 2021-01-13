import React from "react";
import "./CommentUserInfo.css";

const CommentUserInfo = ({ data }) => {
  return <div className="userComment">{data.username}</div>;
};

export default CommentUserInfo;
