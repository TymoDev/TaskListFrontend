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

  const userRegisterHook = async (
    username: string,
    email: string,
    password: string
  ): Promise<{ status: number; error?: string }> => {
    try {
      const result = await registerUser(username, email, password);
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
