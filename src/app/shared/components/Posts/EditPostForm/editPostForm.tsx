import React, { useState, useRef } from "react";
import { Button, IconButton } from "@mui/material";
import { Image, Close } from "@mui/icons-material";
import styles from "./editPostForm.module.scss";
import { IPostDataWithTimeElapsed } from "@/app/shared/@types";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";

interface EditPostFormProps {
  post: IPostDataWithTimeElapsed;
  onCancel: () => void;
  onSave: (updatedPost: IPostDataWithTimeElapsed) => void;
}

const EditPostForm: React.FC<EditPostFormProps> = ({
  post,
  onCancel,
  onSave,
}) => {
  const [editingPostContent, setEditingPostContent] = useState(post.text);
  const [editingPostLocation, setEditingPostLocation] = useState(
    post.location || ""
  );
  const [editingPostImage, setEditingPostImage] = useState<string | null>(
    post.image || null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const themeStyles = useThemeStyles();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setEditingPostImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    onSave({
      ...post,
      text: editingPostContent,
      location: editingPostLocation,
      image: editingPostImage!,
    });
  };

  return (
    <div className={styles.editPost}>
      <label className={styles.placeholder}>Descrição</label>
      <div
        className={styles.inputContainer}
        style={{ backgroundColor: themeStyles.backgroundDefault }}
      >
        <input
          className={styles.input}
          value={editingPostContent}
          onChange={(e) => setEditingPostContent(e.target.value)}
          placeholder="Descrição"
        />
      </div>

      <label className={styles.placeholder}>Localização</label>
      <div
        className={styles.inputContainer}
        style={{ backgroundColor: themeStyles.backgroundDefault }}
      >
        <input
          className={styles.input}
          value={editingPostLocation}
          onChange={(e) => setEditingPostLocation(e.target.value)}
          placeholder="Localização"
        />
      </div>
      <div className={styles.frame3}>
        <div className={styles.frame2}>
          {!editingPostImage && (
            <>
              <IconButton
                className={styles.iconButton}
                onClick={handleImageClick}
              >
                <Image className={styles.icon} />
              </IconButton>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
                accept="image/*"
              />
            </>
          )}
        </div>
      </div>
      {editingPostImage && (
        <div className={styles.imagePreviewContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={editingPostImage}
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
      <div className={styles.editPostButtons}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Atualizar
        </Button>
        <Button variant="outlined" color="primary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default EditPostForm;
