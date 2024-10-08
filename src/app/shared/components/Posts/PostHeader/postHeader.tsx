import React from "react";
import { Avatar } from "@mui/material";
import styles from "./postHeader.module.scss";
import { IPostDataWithTimeElapsed } from "@/app/shared/@types";
import useAvatarProps from "@/app/shared/hooks/AvatarProps/useAvatarProps";
import useFirstAndLastName from "@/app/shared/hooks/FirstAndLastName/useFirstAndLastName";

interface PostHeaderProps {
  post: IPostDataWithTimeElapsed;
  onProfileClick: (authorId: string) => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ post, onProfileClick }) => {
  return (
    <div className={styles.frame1}>
      <div className={styles.userIcons}>
        <Avatar
          onClick={() => onProfileClick(post.author.id)}
          {...useAvatarProps(post.author)()}
          className={styles.avatarStyles}
        />
      </div>
      <div className={styles.postHeader}>
        <div className={styles.postAuthor}>
          {useFirstAndLastName(post.author.name)}
        </div>
        <div className={styles.postTimeLocation}>
          {post.timeElapsed}
          {post.location && (
            <>
              {" "}
              em <span className={styles.postLocation}>{post.location}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
