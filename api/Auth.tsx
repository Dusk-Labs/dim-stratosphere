import { User } from "../src/types";

export const PostSignIn = async (user: User) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username.trim(),
      password: user.password.trim(),
    }),
  };

  const loginPath = "/api/v1/auth/login";
  const signInUrl = user.host + loginPath;

  const response = await fetch(signInUrl, options);

  if (response.status !== 200) {
    console.log("Failed to sign in: ", response.body);
    throw new Error("Something went wrong");
  }

  const data = await response.json();
  const token = JSON.stringify(data.token);

  return token;
};

export const PostSignUp = async (user: User) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username.trim(),
      password: user.password.trim(),
      invite_token: user.inviteToken,
    }),
  };

  const signUpPath = "/api/v1/auth/register";
  const signUpUrl = user.host + signUpPath;

  const response = await fetch(signUpUrl, options);

  if (response.status !== 200) {
    console.log("Failed to sign up: ", response.body);
    throw new Error("Something went wrong");
  }

  const data = await response.json();
  const username = JSON.stringify(data.username);

  return username;
};
