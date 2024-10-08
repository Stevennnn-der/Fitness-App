import React, { useState, useRef, useEffect } from "react";
import "./ImageUpload.css";

const ImageUpload = ({ user_id, user_avatar}) => {
  // const defaultURL = !user_avatar ? DefaultAvatar : user_avatar;
  // const [avatarURL, setAvatarURL] = useState(defaultURL);
  
  // useEffect(() => {
  //   setAvatarURL(!defaultURL ? DefaultAvatar : defaultURL);
  // }, [defaultURL]);


  const defaultURL = user_avatar ? user_avatar : '/default-avatar-image.jpeg';
  const [avatarURL, setAvatarURL] = useState(defaultURL);
  
  useEffect(() => {
    setAvatarURL(defaultURL);
  }, [defaultURL]);

  console.log(avatarURL);
  console.log(user_avatar);
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
      const response = await fetch ("https://us-central1-fitness-app-abbcb.cloudfunctions.net/api/homepage/user", {
        method: "POST",
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        console.error(`Server responded with status ${response.status}: ${response.statusText}`);
        throw new Error(`Failed to upload image: ${response.statusText}`);
      }

      const data = await response.json();
      setAvatarURL(data?.location);
      
    } catch (error) {
      console.error("Error on updating Avatar! ", error);
      setAvatarURL(defaultURL);
    }
   
    
  };

  return (
    <div className="image-icon">
      <img src={`https://us-central1-fitness-app-abbcb.cloudfunctions.net/api`+avatarURL} alt="Avatar" className="avatar"  />
      <form id="form" encType="multipart/form-data">
        <i className="fa-solid fa-camera" onClick={handleImageUpload} />
        <input type="file" id="file" ref={fileUploadRef} draggable="false" onChange={uploadImageDisplay} hidden />
      </form>
    </div>
  );
};

export default ImageUpload;
