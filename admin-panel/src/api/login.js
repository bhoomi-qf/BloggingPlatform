import instance from "./axios";

const login = async (email, password) => {
    try {
        const response = await instance.post("/auth/login", { email, password });
        return response.data; // Assuming the response contains user data and token
    } catch (error) {
        console.error("Login failed:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export { login };