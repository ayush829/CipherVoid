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
            }
        })
        .catch(function(err){
            console.log("Error loading profile", err);
        });
}

document.addEventListener("DOMContentLoaded", loadProfile);