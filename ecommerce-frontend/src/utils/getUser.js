import { jwtDecode } from "jwt-decode";

export const getUser = () => {
    const token = localStorage.getItem("token");
    if (!token || token.split('.').length != 3) return null;

    try {
        const decode = jwtDecode(token);
        // console.log(decode)
        return decode
    } catch (error) {
        console.error("Invalid Token", error)
        return null;
    }
}