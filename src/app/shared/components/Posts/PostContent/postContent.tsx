import React from "react";
import styles from "./postContent.module.scss";
import { IPostDataWithTimeElapsed } from "@/app/shared/@types";

interface PostContentProps {
  post: IPostDataWithTimeElapsed;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <>
      <div className={styles.oQueVoceEstaPensando}>{post.text}</div>
      {post.image && (
        <div
          className={styles.unsplash}
          style={{ backgroundImage: `url(${post.image})` }}
        ></div>
      )}
    </>
  );
};

export default PostContent;
