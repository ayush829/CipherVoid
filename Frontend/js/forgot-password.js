function loadQuestions(){

const username = document.getElementById("username").value;

axios.get(API_BASE + "/security-questions/" + username)

.then(function(response){

const questions = response.data.data;

document.getElementById("questionSection").style.display="block";

document.getElementById("q1").innerText = questions[0].questionText;
document.getElementById("q2").innerText = questions[1].questionText;
document.getElementById("q3").innerText = questions[2].questionText;

})

.catch(function(){

alert("User not found");

});

}


function resetPassword(){

const data={

username: document.getElementById("username").value,

answers:[
document.getElementById("a1").value,
document.getElementById("a2").value,
document.getElementById("a3").value
],

newPassword: document.getElementById("newPassword").value

};

axios.post(API_BASE + "/recover-password", data)

.then(function(){

alert("Password reset successful");

window.location.href="login.html";

})

.catch(function(){

alert("Verification failed");

});

}