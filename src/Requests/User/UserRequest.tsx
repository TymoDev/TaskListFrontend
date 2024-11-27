const API_URL = "https://localhost:7072/api/auth/UserAuth";

export const loginUser = async (username: string,email: string, password: string): Promise<void> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid login credentials");
  }
};

export const registerUser = async ( username: string,email: string, password: string): Promise<void> => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({username, email, password }),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }
};