const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const API_BASE = (isLocal && window.location.port !== "8080" && window.location.port !== "") 
    ? "http://localhost:8080/auth" 
    : "/auth";

function getAuthHeader(){

    const token = localStorage.getItem("token");

    return {
        headers:{
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        }
    };

}