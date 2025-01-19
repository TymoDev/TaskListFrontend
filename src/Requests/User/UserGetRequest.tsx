import { User } from "../../Models/UserModel";

const API_URL = "http://localhost:7072/api/UserGet";

//these parameters must be of the same name as the backend accepts, so that it can deserialize it properly
export const fetchUser = async (): Promise<User> => {
  const response = await fetch(`${API_URL}/user`, {
    method: "GET",
    credentials: "include",
  });

  if (response.ok) {
    console.log("Fetched data succesfully in UserGetRequest");
    return await response.json();
  } else {
    console.log(`Fetch failed with status: ${response.status}`);
    throw new Error(`Fetch failed with status: ${response.status}`);
  }
};
