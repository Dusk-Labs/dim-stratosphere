export type User = {
  username: string;
  password: string;
  host: string;
  inviteToken?: string;
};

export type UserFormErrors = {
  username: string;
  password: string;
  host: string;
};

export type IconInteface = {
  color?: string;
  width?: number;
  heigth?: number;
};
