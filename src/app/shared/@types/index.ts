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
  target: HTMLInputElement | HTMLTextAreaElement;
}

interface IFormEditProps {
  user: IUserData;
  token: string;
  onClose?: () => void;
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
  sex?: "Male" | "Female";
  address?: string;
  phone?: string;
  occupation?: string;
}

interface ICardUsersProps {
  id: string;
  token: string;
}

interface IPostData {
  id: string;
  text: string;
  authorId: string;
  author: IAuthor;
  location?: string;
  likes: string;
  image?: string;
  comments: IComment[];
  createdAt: string;
  likedByCurrentUser?: string;
}

interface IPostsProps {
  posts: IPostData[];
  isButton?: boolean;
}

interface IPostDataWithTimeElapsed extends IPostData {
  timeElapsed: string;
}

interface IPostCreateData {
  text: string;
  location?: string;
  image?: string;
  authorId: string;
}

interface IAuthor {
  id: string;
  name: string;
  image: string;
}

interface IComment {
  id: string;
  text: string;
  author: IAuthor;
}

interface ICreatePostProps extends IFormEditProps {
  onPostCreated: () => void;
}

interface IPostsContainerProps {
  token: string;
  userId?: string;
  refreshPosts: boolean;
  isButton?: boolean;
}

interface IInputFieldProps {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
  className?: string;
  mask?: string;
}

export type {
  IThemeContexData,
  IDrawerContexData,
  IEventProps,
  IChildrenProps,
  IPostData,
  IUserData,
  IAuthor,
  IComment,
  IPostsProps,
  IAuthContextData,
  IInputFieldProps,
  IPostCreateData,
  IFormEditProps,
  IPostsContainerProps,
  ICardUsersProps,
  IPostDataWithTimeElapsed,
  ICreatePostProps,
};
