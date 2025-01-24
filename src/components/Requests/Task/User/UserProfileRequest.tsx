import { UserProfile } from "../../../Models/UserProfileModel";

const API_URL = "http://localhost:7072/api/UserProfile";

//these parameters must be of the same name as the backend accepts, so that it can deserialize it properly
export const fetchUserProfile = async (id: string): Promise<UserProfile> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    // console.log("Fetched user profile succesfully");
    return await response.json();
  } else {
    console.log(
      `Fetched user profile failed with status: ${response.status} in UserProfileRequest`
    );
    throw new Error(`Fetch failed with status: ${response.status}`);
  }
};
