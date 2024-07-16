import React, { useState, useRef } from "react";
import styles from "./CreatePost.module.scss";
import { Avatar, IconButton } from "@mui/material";
import { Image, LocationOn, Close } from "@mui/icons-material";
import { IFormEditProps } from "../../@types";
import useAvatarProps from "../../hooks/AvatarProps.ts/useAvatarProps";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";
import { createPost } from "../../services/api/postApi";

const CreatePost = ({ user, token }: IFormEditProps) => {
  const [postContent, setPostContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [location, setLocation] = useState("");
  const getAvatarProps = useAvatarProps();
  const themeStyles = useThemeStyles();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePost = async () => {
    if (postContent.trim() === "") return alert("O post não pode estar vazio!");

    const post = {
      text: postContent,
      location,
      image: imagePreview || "",
      authorId: user.id,
    };

    try {
      const response = await createPost(post, token);
      console.log("Post criado com sucesso:", response);
      setPostContent("");
      setImagePreview(null);
      setSelectedImage(null);
      setLocation("");
      setShowLocationInput(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Erro ao criar o post:", error);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleLocationClick = () => {
    setShowLocationInput((prev) => !prev);
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: themeStyles.backgroundPaper,
        border: themeStyles.borderColor,
      }}
    >
      <div className={styles.frame1}>
        <Avatar className={styles.userIcon} {...getAvatarProps()} />
        <div
          className={styles.inputContainer}
          style={{ backgroundColor: themeStyles.backgroundDefault }}
        >
          <input
            className={styles.input}
            placeholder="O que você está pensando?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
        </div>
      </div>
      {showLocationInput && (
        <div className={styles.frame1}>
          <div
            className={styles.inputContainer}
            style={{ backgroundColor: themeStyles.backgroundDefault }}
          >
            <input
              className={styles.input}
              placeholder="Digite o nome da cidade"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className={styles.frame3}>
        <div className={styles.frame2}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
            accept="image/*"
          />
          <IconButton className={styles.iconButton} onClick={handleImageClick}>
            <Image className={styles.icon} />
          </IconButton>
          <IconButton
            className={styles.iconButton}
            onClick={handleLocationClick}
          >
            <LocationOn className={styles.icon} />
          </IconButton>
        </div>
        <button className={styles.button} onClick={handlePost}>
          <span className={styles.buttonLabel}>Postar</span>
        </button>
      </div>
      {imagePreview && (
        <div className={styles.imagePreviewContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={imagePreview}
              alt="Pré-visualização"
              className={styles.imagePreview}
            />
            <IconButton
              className={styles.closeButton}
              onClick={handleRemoveImage}
            >
              <Close className={styles.closeIcon} />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
