"use client";
import React, { useState } from "react";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import {
  Typography,
  Box,
  Button,
  Grid,
  Modal,
  useTheme,
  Avatar,
} from "@mui/material";
import styles from "./perfil.module.scss";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import FormatDateToBRFull from "@/app/shared/utils/ConvertDates/convertDate";
import ConvertSex from "@/app/shared/utils/ConvertSex/convertSex";
import FormEdit from "@/app/shared/components/FormEdit/formEdit";
import bannerImage from "../../assets/banner-perfil.png";
import bannerImageMobile from "../../assets/banner-perfil-mobile.png";
import useAvatarProps from "@/app/shared/hooks/AvatarProps.ts/useAvatarProps";

export default function Perfil() {
  const { user, token } = useAuthContext();
  const theme = useTheme();
  const mdDown = theme.breakpoints.down("md");
  const getAvatarProps = useAvatarProps();
  const themeStyles = useThemeStyles();
  const [open, setOpen] = useState(false);

  if (!user || !token) {
    return null;
  }

  const handleEdit = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <Avatar
              sx={{ width: theme.spacing(20), height: theme.spacing(20) }}
              {...getAvatarProps()}
            />
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
                {user.occupation}
              </Typography>
            </Grid>
            <Grid item xs={12} md="auto">
              <Button
                variant="contained"
                onClick={handleEdit}
                className={styles.editButton}
              >
                Editar Perfil
              </Button>
            </Grid>
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
                <Typography>{user.address}</Typography>
              </Box>
              <Box className={styles.contactItem}>
                <Typography>{user.email}</Typography>
              </Box>
              <Box className={styles.contactItem}>
                <Typography>{user.phone}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.postsContainer}>
          <Typography variant="h6" className={styles.subHeadingPost}>
            Posts
          </Typography>
          <Box
            className={styles.posts}
            style={{
              backgroundColor: themeStyles.backgroundPaper,
              border: themeStyles.borderColor,
            }}
          >
            <Box className={styles.post}>
              <Box className={styles.postHeader}>
                <Box className={styles.postUser}>
                  <Box className={styles.userIconSmall}>
                    <Avatar
                      className={styles.userIconSmall}
                      {...getAvatarProps()}
                    />
                  </Box>
                  <Typography variant="body1">{user.name}</Typography>
                </Box>
                <Typography variant="body2">48 minutos atrás</Typography>
              </Box>
              <Typography variant="body2">
                Vou abrir um canal no youtube
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          className={styles.modalBox}
          sx={{
            backgroundColor: themeStyles.backgroundPaper,
          }}
        >
          <FormEdit user={user} token={token} onClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
}
