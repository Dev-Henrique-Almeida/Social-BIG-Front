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

interface IFormCreateCardProps {
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
  likes: number;
  image?: string;
  comments: IComment[];
  createdAt: string;
  likedByCurrentUser?: boolean;
}

interface IMarketData {
  id: string;
  sellerId?: string;
  buyerId?: string;
  price: number;
  image?: string;
  vendido?: boolean;
  name: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IMarketContent {
  market: IMarketData[];
  refreshMarket: () => void;
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

interface IMarketCreateData {
  name: string;
  description: string;
  image?: string;
  price: number;
  sellerId: string;
}

interface IAuthor {
  id: string;
  name: string;
  image: string;
}

interface IComment {
  id: string;
  content: string;
  author: IAuthor;
  createdAt?: string;
  timeElapsed?: string;
  likeCount?: number;
}

interface ICommentsListProps {
  comments: IComment[];
  visibleCommentsCount: number;
  postId: string;
  onShowMoreComments: (postId: string) => void;
  onShowLessComments: (postId: string) => void;
}

interface ICommentInputProps {
  postId: string;
  onCommentAdded: (comment: ICommentData) => void;
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

interface IMarketContainerProps {
  token: string;
  userId?: string;
  refreshMarket?: boolean;
}

interface IPostOptionsProps {
  post: IPostDataWithTimeElapsed;
  onEdit: () => void;
  onDelete: () => void;
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

interface ICommentData {
  content: string;
  authorId: string;
  postId: string;
  createdAt?: string;
  parentCommentId?: string;
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
  ICommentData,
  IPostsProps,
  IAuthContextData,
  IInputFieldProps,
  IPostCreateData,
  IFormEditProps,
  IPostsContainerProps,
  ICardUsersProps,
  IPostOptionsProps,
  ICommentInputProps,
  ICommentsListProps,
  IPostDataWithTimeElapsed,
  ICreatePostProps,
  IMarketData,
  IMarketCreateData,
  IMarketContainerProps,
  IFormCreateCardProps,
  IMarketContent,
};
