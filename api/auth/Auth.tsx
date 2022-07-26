type SignInrops = {
  signInUrl: string;
  options: {
    method: string;
    headers: {
      "Content-Type": string;
    };
    body: string;
  };
};

type SignUpProps = {
  signUpUrl: string;
  options: {
    method: string;
    headers: {
      "Content-Type": string;
    };
    body: string;
  };
};

export const PostSignIn = async ({ signInUrl, options }: SignInrops) => {
  let userToken: string | null = null;
  await fetch(signInUrl, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then(async (data) => {
      userToken = await JSON.stringify(data.token);
    })
    .catch((error) => {
      alert("Error signing up: " + error);
    });

  return userToken;
};

export const PostSignUp = async ({ signUpUrl, options }: SignUpProps) => {
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
      username = await JSON.stringify(data.username);
    })
    .catch((error) => {
      alert("Error signing up: " + error);
    });
  return username;
};
