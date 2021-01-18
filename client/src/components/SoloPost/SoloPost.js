import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserData from "../Home/HomePage/Post/UserData/UserData";
import PostData from "../Home/HomePage/Post/PostData/PostData";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";

const SoloPost = () => {
  const history = useHistory();
  const postId = history.location.pathname.split("/")[2];
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`/api/post/${postId}/data`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        setData(data);
      }
    }

    fetchData();
  }, [fetch, postId]);

  if (data === null) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <div className="post">
        <UserData data={data.userInfo} />
        <PostData data={data.post} />
      </div>
    </>
  );
};

export default SoloPost;
