const id = localStorage.getItem("editPasswordId");

$("#updateForm").submit(function(e){

e.preventDefault();

const data={

id:id,
accountName:$("#accountName").val(),
website:$("#website").val(),
username:$("#username").val(),
password:$("#password").val(),
category:$("#category").val(),
notes:$("#notes").val()

};

axios.put(API_BASE+"/update-password",data,getAuthHeader())

.then(function(){

window.location.href="dashboard.html";

});

});

function goBack(){

window.location.href="dashboard.html";

}