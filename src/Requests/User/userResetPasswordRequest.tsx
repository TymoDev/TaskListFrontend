const API_URL = "http://localhost:7072/api/auth/ResetPassword";
//these parameters must be of the same name as the backend accepts, so that it can deserialize it properly

export const resetPassword = () => {
  const resetPasswordCodeHook = async (
    email: string
  ): Promise<{ status: number; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/reset/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || "Invalid  email";
        return { status: response.status, error: errorMessage };
      }

      return { status: response.status };
    } catch (error: any) {
      console.error("Reset password error:", error.message);
      return {
        status: 500,
        error: error.message || "An error occurred during sending code.",
      };
    }
  };

  const verifyCodeUserHook = async (
    Email: string,
    Code: number
  ): Promise<{ status: number; error?: string }> => {
    try {
      const response = await fetch(`${API_URL}/reset/password/code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email, Code }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || "Verify code failed";
        return { status: response.status, error: errorMessage };
      }

      return { status: response.status };
    } catch (error: any) {
      console.error("Verify code error:", error.message);
      return {
        status: 500,
        error: error.message || "An error occurred during verifying code.",
      };
    }
  };
  return {resetPasswordCodeHook, verifyCodeUserHook };
};
