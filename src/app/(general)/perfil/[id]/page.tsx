"use client";

import React, { useState, useEffect } from "react";
import { Avatar, Box, Grid, Typography, useTheme } from "@mui/material";
import { useAuthContext } from "@/app/shared/contexts";
import PostsContainer from "@/app/shared/components/Posts/PostContainer/postsContainer";
import useAvatarProps from "@/app/shared/hooks/AvatarProps/useAvatarProps";
import useRefreshPosts from "@/app/shared/hooks/RefreshPosts/useRefreshPosts";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import FormatDateToBRFull from "@/app/shared/utils/ConvertDates/convertDate";
import ConvertSex from "@/app/shared/utils/ConvertSex/convertSex";
import bannerImage from "../../../assets/banner-perfil.png";
import bannerImageMobile from "../../../assets/banner-perfil-mobile.png";
import styles from "./perfil.module.scss";
import { usePathname } from "next/navigation";
import { IUserData } from "@/app/shared/@types";
import { getByUser } from "@/app/shared/services";

export default function Perfil() {
  const { user: userLogado, token } = useAuthContext();
  const theme = useTheme();
  const mdDown = theme.breakpoints.down("md");
  const themeStyles = useThemeStyles();
  const { refreshPosts } = useRefreshPosts();
  const [user, setUser] = useState<IUserData | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = pathname.split("/").pop() as string;

      if (userLogado && token) {
        try {
          const fetchedUser = await getByUser(userId, token);
          setUser(fetchedUser);
        } catch (error) {
          console.error("Erro ao buscar usuário:", error);
        }
      }
    };

    fetchUser();
  }, [userLogado, token, pathname]);

  if (!user || !token) {
    return null;
  }

  const avatarProps = useAvatarProps(user)();

  return (
    <Box className={styles.body}>
      <Box
        className={styles.coverProfile}
        sx={{ border: themeStyles.borderColor }}
      >
        <Box
          className={styles.cover}
          sx={{
            backgroundImage: mdDown
              ? `url(${bannerImage.src})`
              : `url(${bannerImageMobile.src})`,
          }}
        ></Box>
        <Box
          className={styles.profileName}
          sx={{ backgroundColor: themeStyles.backgroundPaper }}
        >
          <Box className={styles.imageBackground}>
            <Avatar className={styles.avatarStyle} {...avatarProps} />
          </Box>
          <Grid
            container
            alignItems="center"
            spacing={2}
            className={styles.nameContainer}
          >
            <Grid item xs={12} md="auto">
              <Typography variant="h4" className={styles.name}>
                {user.name}
              </Typography>
              <Typography variant="h6" className={styles.title}>
                {user.occupation || "(Não informado)"}
              </Typography>
            </Grid>
            <Grid item xs={12} md="auto"></Grid>
          </Grid>
        </Box>
      </Box>
      <Box className={styles.content}>
        <Box className={styles.aboutContainer}>
          <Typography variant="h6" className={styles.subHeading}>
            Sobre
          </Typography>
          <Box
            className={styles.about}
            style={{
              backgroundColor: themeStyles.backgroundPaper,
              border: themeStyles.borderColor,
            }}
          >
            <Box className={styles.contactInfo}>
              <Box className={styles.contactItem}>
                <Typography>{ConvertSex(user.sex)}</Typography>
              </Box>
              <Box className={styles.contactItem}>
                <Typography>{FormatDateToBRFull(user.birthdate)}</Typography>
              </Box>
              <Box className={styles.contactItem}>
                <Typography>{user.address || "(Não informado)"}</Typography>
              </Box>
              <Box className={styles.contactItem}>
                <Typography>{user.email}</Typography>
              </Box>
              <Box className={styles.contactItem}>
                <Typography>{user.phone || "(Não informado)"}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.postsContainer}>
          <Typography variant="h6" className={styles.subHeadingPost}>
            Posts
          </Typography>
          <Box className={styles.posts}>
            <PostsContainer
              userId={user.id}
              token={token}
              isButton={true}
              refreshPosts={refreshPosts}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
