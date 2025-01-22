const API_URL = "http://localhost:7072/api/auth/UserAuth";

//these parameters must be of the same name as the backend accepts, so that it can deserialize it properly
export const loginUser = async (
  login: string,
  password: string
): Promise<{ status: number; error?: string }> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || "Invalid login credentials";
    return { status: response.status, error: errorMessage };
  }

  return { status: response.status };
};

export const logoutUser = async (): Promise<void> => {
  console.log("Attempting to log out..."); // Діагностичний лог

  const response = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    console.error("Logout failed with status:", response.status);
    throw new Error("Logout failed");
  }

  console.log("Logged out successfully");
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<{ status: number; error?: string }> => {
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
};

export const AuthVerifyUser = async (): Promise<{
  status: number;
  error?: string;
}> => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errorMessage = errorData?.message || "Registration failed";
    return { status: response.status, error: errorMessage };
  }

  return { status: response.status };
};
