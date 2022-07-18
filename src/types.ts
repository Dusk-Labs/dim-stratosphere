export interface User {
  username: string;
  password: string;
  host: string;
  inviteToken?: string;
}

export interface UserFormErrors {
  username: string;
  password: string;
  host: string;
}
