import {
    loginUser,
    registerUser
} from "../Requests/User/UserRequest";

export const userAuth = () => {
    const userLogginHook = async (username: string, email: string, password: string): Promise<void> => {
        try {
            await loginUser(username, email, password);
        } catch (error: any) {
            console.error("Login failed:", error.message);
            return;
        }
    };

    const userRegisterHook = async (username: string, email: string, password: string): Promise<void> => {
        try {
            await registerUser(username, email, password);
        } catch (error: any) {
            console.error("Registration failed:", error.message);
            throw new Error("Failed to register.");
        }
    };

    return { userLogginHook, userRegisterHook };
};
