import React from "react";

interface AuthContextProps {
  signIn: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
  signOut: () => void;
  signUp: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<void>;
}

export const AuthContext = React.createContext<AuthContextProps | null>(null);
