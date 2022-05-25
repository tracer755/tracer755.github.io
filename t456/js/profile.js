loaduserdata()
function loaduserdata() {
  if (token == "" || tokentype == '') {
    setTimeout(() => { loaduserdata() }, 500);
    return;
  }
  loadprofiledata();
}

let profilepic = document.getElementById("profileimg");
let usernameelement = document.getElementById("usernameplace");
let emailelement = document.getElementById("emailplace");
let accountelement = document.getElementById("accounttypeplace");
let permselement = document.getElementById("permsplace");

function loadprofiledata(){
  profilepic.src = profileimglink
  usernameelement.innerHTML = username
  emailelement.innerHTML = email

  accountelement.innerHTML = "Account Type: " + userdata.Type;

      let permcount = 0;
  if (userdata.Edit == "true"){
    permselement.innerHTML += "Edit,  "
    permcount++;
  }
  if (userdata.AccountControl == "true"){
    permselement.innerHTML += "AccountControl,  "
    permcount++;
  }

  //if no perms
  if(permcount == 0){
    permselement.innerHTML += "None"
  }
}