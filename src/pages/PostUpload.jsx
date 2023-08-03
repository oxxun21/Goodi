import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

//component
import Layout from "../layout/Layout";
import UpdateTotalUI from "../components/PostProductWriting/UploadTotalUI";

//이미지
import postUproad from "../assets/post_upload.svg";

//API
import { postUploadAPI } from "../api/post"

//recoil
import loginToken from "../recoil/loginToken";
import accountname from "../recoil/accountname";

export default function PostUpload() {
  const navigate = useNavigate();

  const token = useRecoilValue(loginToken);
  const account_name = useRecoilValue(accountname);
  const myProfile = `/profile/${account_name}`

  const [imageWrap, setImageWrap] = useState([]);
  const [userErrorMessage, setUserErrorMessage] = useState([]);

  // 게시글 입력 데이터
  const [postData, setPostData] = useState();
  const [data, setData] = useState({
    post: {
      content: "",
      image: "",
    },
  });

  const getPostData = (data) => {
    setPostData(data);
  };

  useEffect(() => {
    if (postData) {
      handlePost(postData, token);
      console.log("포스트 정보",postData)
    }
  }, [postData]);

  const handlePost = async (PostData, token) => {
    const response = await postUploadAPI(PostData, token);
    if (response.hasOwnProperty("post")) navigate(myProfile);
  };

  const handleError = (e) => {
    setData((prevState) => ({
      ...prevState,
      post: {
        ...prevState.post,
        image: imageWrap.join(),
      },
    }));
    const errors = [];
    if (data.post.image === "") {
      errors.push("게시글 이미지를 한개 이상 업로드 해주세요");
    } else {
      errors.push("");
    }
    setUserErrorMessage(errors);
  };

  return (
    <Layout reduceTop="true">
      <UpdateTotalUI
        src={postUproad}
        subtext="당신의 게시글을 업로드 해보세요!"
        getData={getPostData}
        data={data}
        setData={setData}
        handleError={handleError}
        setImageWrap={setImageWrap}
        imageWrap={imageWrap}
        userErrorMessage={userErrorMessage}
      />
    </Layout>
  );
}