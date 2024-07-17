"use client";
import { useEffect, useState } from "react";
import { IFormEditProps, IUserData } from "../../@types";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { getOthersUsers } from "../../services";
import { Avatar } from "@mui/material";
import styles from "./cardUsers.module.scss";
import useThemeStyles from "../../hooks/ThemeStyles/useThemeStyles";

const CardUsers: React.FC<IFormEditProps> = ({ user, token }) => {
  const [users, setUsers] = useState<IUserData[]>([]);
  const themeStyles = useThemeStyles();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getOthersUsers(token, user.id!);
        setUsers(users);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, [token, user.id]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  if (users.length === 0) {
    return null;
  }

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: themeStyles.backgroundPaper,
        border: themeStyles.borderColor,
      }}
    >
      <div className={styles.header} onClick={handleToggle}>
        <div className={styles.title}>Meus Amigos</div>
        <div className={styles.icon}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      <div className={`${styles.friendList} ${isOpen ? styles.open : ""}`}>
        {users.map((user) => (
          <div className={styles.friendItem} key={user.id}>
            <Avatar
              sx={{
                border: "1px solid #E9B425",
              }}
              src={user.image}
              alt={`${user.name}'s avatar`}
            />
            <div className={styles.friendName}>{user.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardUsers;
