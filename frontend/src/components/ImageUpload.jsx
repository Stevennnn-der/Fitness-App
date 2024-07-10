import React, { useState, useRef } from "react";
import "./ImageUpload.css";
import DefaultAvatar from "../assets/default-avatar-image.jpeg";

const ImageUpload = () => {
  const [avatarURL, setAvatarURL] = useState(DefaultAvatar);

  const fileUploadRef = useRef();
  const handleImageUpload = (e) => {
    e.preventDefault();
    fileUploadRef.current.click();
  };

  const uploadImageDisplay = async () => {
    try {
      const uploadFile = fileUploadRef.current.files[0];
      const formData = new FormData();
      formData.append("file", uploadFile);
      const response = await fetch ("http://localhost:5001/homepage/user", {
        method: "post",
        body: formData
      });

      const data = await response.json();
      setAvatarURL(data?.location);
    } catch (error) {
      console.error("Error on updating Avatar! ", error);
      setAvatarURL(DefaultAvatar);
    }
   
    
  };

  return (
    <div className="image-icon">
      <img src={avatarURL} alt="Avatar" className="avatar" />
      <form id="form" encType="multipart/form-data">
        <i className="fa-solid fa-camera" onClick={handleImageUpload} />
        <input type="file" id="file" ref={fileUploadRef} draggable="false" onChange={uploadImageDisplay} hidden />
      </form>
    </div>
  );
};

export default ImageUpload;
