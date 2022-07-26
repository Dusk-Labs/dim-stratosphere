import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogIn } from "../../screens/Auth/LogIn";
import { SignIn } from "../../screens/Auth/SignIn";
import { SignUp } from "../../screens/Auth/SignUp";

export type AuthStackParams = {
  LogIn: { title: string };
  SignIn: { title: string };
  SignUp: { title: string };
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

export const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "none",
      }}
    >
      <AuthStack.Screen name="LogIn" component={LogIn} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};
