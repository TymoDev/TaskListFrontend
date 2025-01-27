import {
  AuthVerifyUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../../Requests/Task/User/UserRequestAuth";

export const userAuthHook = () => {
  const userLogginHook = async (
    email: string,
    password: string
  ): Promise<{ status: number; error?: string }> => {
    try {
      const result = await loginUser(email, password);
      return result;
    } catch (error: any) {
      return {
        status: 500,
        error: error.message || "An error occurred during login.",
      };
    }
  };
  const userLogoutHook = async (): Promise<void> => {
    try {
      await logoutUser();
      console.log("User logged out successfully");
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    }
  };

  const userRegisterHook = async (data: {
    login: string;
    email: string;
    password: string;
    username: string;
    gender: string;
    birthday: string;
    location: string;
    description: string;
    twitterUrl: string;
    linkedInUrl: string;
    gitHubUrl: string;
    personalWebsiteUrl: string;
  }): Promise<{ status: number; error?: string }> => {
    try {
      //console.log(data);
      const result = await registerUser(
        data.login,
        data.email,
        data.password,
        data.username,
        data.gender,
        data.birthday,
        data.location,
        data.description,
        data.twitterUrl,
        data.linkedInUrl,
        data.gitHubUrl,
        data.personalWebsiteUrl
      );
      return result;
    } catch (error: any) {
      return {
        status: 500,
        error: error.message || "An error occurred during registration.",
      };
    }
  };

  const userVerifyAuthHook = async (): Promise<{
    status: number;
    error?: string;
  }> => {
    try {
      const result = await AuthVerifyUser();
      return result;
    } catch (error: any) {
      return {
        status: 500,
        error: error.message || "An error occurred during login.",
      };
    }
  };

  return {
    userLogginHook,
    userRegisterHook,
    userVerifyAuthHook,
    userLoginHook: userAuthHook,
    userLogoutHook,
  };
};
