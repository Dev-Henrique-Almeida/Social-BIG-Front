"use client";
import React, { useState } from "react";
import { useAuthContext } from "@/app/shared/contexts/Auth/AuthContext";
import { Typography, Box, Button, Grid, Modal } from "@mui/material";
import styles from "./perfil.module.scss";
import useThemeStyles from "@/app/shared/hooks/ThemeStyles/useThemeStyles";
import FormatDateToBRFull from "@/app/shared/utils/convertDate";
import ConvertSex from "@/app/shared/utils/convertSex";
import FormEdit from "@/app/shared/components/FormEdit/formEdit";

export default function Perfil() {
  const { user, token } = useAuthContext();
  const themeStyles = useThemeStyles();
  const [open, setOpen] = useState(false);

  if (!user) {
    return null;
  }

  if (!token) {
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
          style={{ backgroundColor: themeStyles.backgroundPaper }}
        ></Box>
        <Box className={styles.profileName}>
          <Box className={styles.imageBackground}>
            <img
              className={styles.userIcons}
              src={user.image}
              alt={user.name}
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

        <Box className={styles.posts}>
          <Typography variant="h6" className={styles.subHeading}>
            Posts
          </Typography>
          <Box
            className={styles.post}
            style={{
              backgroundColor: themeStyles.backgroundPaper,
              border: themeStyles.borderColor,
            }}
          >
            <Box className={styles.postHeader}>
              <Box className={styles.postUser}>
                <Box className={styles.userIconSmall}>
                  <img
                    className={styles.userIconSmall}
                    src={user.image}
                    alt={user.name}
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
