interface IThemeContexData {
  themeName: "dark" | "light";
  toggleTheme: () => void;
}

interface IDrawerContexData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

interface IChildrenProps {
  children: React.ReactNode;
}

interface IEventProps {
  target: HTMLInputElement;
}

interface IUserData {
  name: string;
  username: string;
  email: string;
  birthdate: string;
  password: string;
  confirmPassword: string;
}

export type {
  IThemeContexData,
  IDrawerContexData,
  IEventProps,
  IChildrenProps,
  IUserData,
};
