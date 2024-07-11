interface IThemeContexData {
  themeName: "dark" | "light";
  toggleTheme: () => void;
}

interface IDrawerContexData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

interface IAuthContextData {
  user: IUserData | null;
  token: string | null;
  setUser: (user: IUserData | null) => void;
  setToken: (token: string | null) => void;
}

interface IChildrenProps {
  children: React.ReactNode;
}

interface IEventProps {
  target: HTMLInputElement;
}

interface IUserData {
  id?: string;
  name: string;
  username: string;
  email: string;
  birthdate: string;
  password: string;
  confirmPassword: string;
  image?: string;
  sex?: string;
  address?: string;
  phone?: string;
  occupation?: string;
}

export type {
  IThemeContexData,
  IDrawerContexData,
  IEventProps,
  IChildrenProps,
  IUserData,
  IAuthContextData,
};
