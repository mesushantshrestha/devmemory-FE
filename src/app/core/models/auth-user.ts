export type AuthUser = {
  id?: string;
  name?: string;
  email?: string;
  pictureUrl?: string;
};

export type AuthMeResponse = {
  loggedIn: boolean;
  userId?: string;
  email?: string;
  name?: string;
  pictureUrl?: string;
};
