function toggle2FA(){

const isChecked = document.getElementById("twoFactorToggle").checked;

axios.put(API_BASE + "/toggle-2fa", {}, getAuthHeader())

.then(function(response){

alert(`2FA is now ${response.data.data ? 'ENABLED' : 'DISABLED'}`);
loadProfile();

})

.catch(function(err){

console.log(err);
alert("Failed to update 2FA");

});

}

function loadProfile() {
    axios.get(API_BASE + "/profile", getAuthHeader())
        .then(function(response) {
            if(response.data.success) {
                const p = response.data.data;
                document.getElementById("name").value = p.name || "";
                document.getElementById("email").value = p.email || "";
                document.getElementById("phone").value = p.phone || "";
                document.getElementById("twoFactorToggle").checked = p.twoFactorEnabled;

                // Store originals for cancellation
                window.originalProfileData = p;
            }
        })
        .catch(function(err){
            console.log("Error loading profile", err);
        });
}

function enableEdit() {
    document.getElementById("name").removeAttribute("readonly");
    document.getElementById("email").removeAttribute("readonly");
    document.getElementById("phone").removeAttribute("readonly");
    
    document.getElementById("editBtn").style.display = "none";
    document.getElementById("saveBtn").style.display = "block";
    document.getElementById("cancelBtn").style.display = "block";
}

function cancelEdit() {
    document.getElementById("name").setAttribute("readonly", true);
    document.getElementById("email").setAttribute("readonly", true);
    document.getElementById("phone").setAttribute("readonly", true);
    
    document.getElementById("editBtn").style.display = "block";
    document.getElementById("saveBtn").style.display = "none";
    document.getElementById("cancelBtn").style.display = "none";

    // Restore original values
    if (window.originalProfileData) {
        document.getElementById("name").value = window.originalProfileData.name || "";
        document.getElementById("email").value = window.originalProfileData.email || "";
        document.getElementById("phone").value = window.originalProfileData.phone || "";
    }
}

/**
 * Deletes the user account after mandatory master password verification.
 * Why: Irreversible "Kill Switch" for the entire vault. Ensures the user
 * is certain before performing destructive data cleanup.
 */
function deleteAccount() {
    const pwd = prompt("CRITICAL: Enter your Master Password to confirm TOTAL account deletion.\nThis action is IRREVERSIBLE!");
    
    if (pwd === null || pwd.trim() === "") {
        return;
    }

    const reconfirm = confirm("WARNING: This will permanently destroy all your saved passwords and personal data.\n\nAre you ABSOLUTELY sure you want to proceed?");
    
    if (!reconfirm) {
        return;
    }

    axios.delete(API_BASE + "/delete-account", {
        data: { masterPassword: pwd },
        headers: getAuthHeader().headers
    })
    .then(function(response) {
        alert("Account and all associated records have been permanently deleted. Logging you out.");
        localStorage.removeItem("token");
        window.location.href = "index.html";
    })
    .catch(function(err) {
        console.error("Deletion Failed:", err);
        if (err.response && err.response.data && err.response.data.message) {
            alert("Deletion Failed: " + err.response.data.message);
        } else {
            alert("Verification failed. Please check your master password.");
        }
    });
}

document.addEventListener("DOMContentLoaded", loadProfile);