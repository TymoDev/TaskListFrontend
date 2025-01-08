import { UserResetPassword } from "../../Requests/User/UserRequestUpdate";


export const useUserPasswordReset = () => {
  const resetPasswordHook = async (
    email: string,
    password: string
  ): Promise<{ status: number; error?: string }> => {
    try {
      const result = await UserResetPassword(email, password);
      return result;
    } catch (error: any) {
      return {
        status: 500,
        error: error.message || "An error occurred during password reset.",
      };
    }
  };

  return { resetPasswordHook };
};
