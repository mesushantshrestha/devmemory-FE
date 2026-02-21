export type AuthUser = {
  id?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
};

export type AuthMeResponse = {
  loggedIn: boolean;
  userId?: string;
  email?: string;
  name?: string;
  pictureUrl?: string;
};
