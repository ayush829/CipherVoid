const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const API_BASE = (isLocal && window.location.port !== "8080" && window.location.port !== "") 
    ? "http://localhost:8080/auth" 
    : "/auth";

/**
 * Retrieves the JWT token from localStorage and formats it for HTTP requests.
 * Why: Ensures every authenticated API call securely transports the user's session token.
 */
function getAuthHeader() {

    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: "Bearer " + token
        }
    };
}