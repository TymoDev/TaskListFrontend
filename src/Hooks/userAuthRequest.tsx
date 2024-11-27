import { loginUser, registerUser } from "../Requests/User/UserRequest";

export const userAuth = () => {
  const userLogginHook = async (
    username: string,
    email: string,
    password: string
  ): Promise<{ status: number; error?: string }> => {
    try {
      const result = await loginUser(username, email, password);
      return result;
    } catch (error: any) {
      return {
        status: 500,
        error: error.message || "An error occurred during login.",
      };
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

  return { userLogginHook, userRegisterHook };
};
