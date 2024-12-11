const API_URL = "http://localhost:7072/api/auth/UserAuth";
export const loginUser = async (
  Login: string,
  password: string
): Promise<{ status: number; error?: string }> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: Login, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || "Invalid login credentials";
      return { status: response.status, error: errorMessage };
    }

    return { status: response.status };
  } catch (error: any) {
    console.error("Login error:", error.message);
    return {
      status: 500,
      error: error.message || "An error occurred during login.",
    };
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<{ status: number; error?: string }> => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || "Registration failed";
      return { status: response.status, error: errorMessage };
    }

    return { status: response.status };
  } catch (error: any) {
    console.error("Registration error:", error.message);
    return {
      status: 500,
      error: error.message || "An error occurred during registration.",
    };
  }
};

export const tryAuthUser = async () => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return { status: response.status, success: false };
    }

    return { status: response.status, success: true };
  } catch (error) {
    console.error("Error:", error);
    return { status: 500, success: false };
  }
};
