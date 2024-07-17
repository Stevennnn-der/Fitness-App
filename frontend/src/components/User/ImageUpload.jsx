import React, { useState, useRef, useEffect } from "react";
import "./ImageUpload.css";
import DefaultAvatar from "../../assets/default-avatar-image.jpeg";

const ImageUpload = ({ user_id, user_avatar}) => {
  const defaultURL = !user_avatar ? DefaultAvatar : user_avatar;
  const [avatarURL, setAvatarURL] = useState(defaultURL);
  
  useEffect(() => {
    setAvatarURL(!defaultURL ? DefaultAvatar : defaultURL);
  }, [defaultURL]);

  console.log(avatarURL);
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
      formData.append("user_id", user_id);
      console.log(uploadFile);
      const response = await fetch ("http://localhost:5001/homepage/user", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setAvatarURL(data?.location);
      
    } catch (error) {
      console.error("Error on updating Avatar! ", error);
      setAvatarURL(defaultURL);
    }
   
    
  };

  return (
    <div className="image-icon">
      <img src={`http://localhost:5001`+avatarURL} alt="Avatar" className="avatar"  />
      <form id="form" encType="multipart/form-data">
        <i className="fa-solid fa-camera" onClick={handleImageUpload} />
        <input type="file" id="file" ref={fileUploadRef} draggable="false" onChange={uploadImageDisplay} hidden />
      </form>
    </div>
  );
};

export default ImageUpload;
