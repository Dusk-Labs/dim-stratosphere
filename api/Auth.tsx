import { User } from "../src/types";

type SignInrops = {
  user: User;
};

type SignUpProps = {
  user: User;
};

export const PostSignIn = async ({ user }: SignInrops) => {
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

  let userToken: string | null = null;
  signInUrl !== "" &&
    (await fetch(signInUrl, options)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(async (data) => {
        userToken = JSON.stringify(data.token);
      })
      .catch((error) => {
        alert("Error signing in: " + error);
      }));

  return userToken;
};

export const PostSignUp = async ({ user }: SignUpProps) => {
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

  let username: string | null = null;
  await fetch(signUpUrl, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then(async (data) => {
      username = JSON.stringify(data.username);
    })
    .catch((error) => {
      alert("Error signing up: " + error);
    });
  return username;
};
