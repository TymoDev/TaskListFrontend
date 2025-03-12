import { UserProfileUpdateImage } from "../../../Models/UserProfileModel";

const API_URL = "http://localhost:7072/api/update";

//these parameters must be of the same name as the backend accepts, so that it can deserialize it properly
export const UserResetPassword = async (
  Email: string,
  Password: string
): Promise<{ status: number; error?: string }> => {
  try {
    const response = await fetch(`${API_URL}/UserUpdate/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email, Password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage = errorData?.message || "Invalid password";
      return { status: response.status, error: errorMessage };
    }

    return { status: response.status };
  } catch (error: any) {
    console.error("Login error:", error.message);
    return { status: 500 };
  }
};

export const UserUpdateImage = async (
  file: File
): Promise<UserProfileUpdateImage> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/UserUpdate/image`, {
    method: "PUT",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Update image failed with status: ${response.status}`);
  }
  var result = await response.json();

  return await result;
};
