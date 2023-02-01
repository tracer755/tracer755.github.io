loaduserdata()
function loaduserdata() {
  if (token == "" || tokentype == '') {
    setTimeout(() => { loaduserdata() }, 100);
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
  let tmp = "";
  if (userdata.Edit == "true"){
    tmp += "Edit | "
    permcount++;
  }
  if (userdata.AccountControl == "true"){
    tmp += "AccountControl | "
    permcount++;
  }

  //if no perms logoutBtn
  if(permcount > 0){
    permselement.innerHTML = tmp.slice(0, -3)
    document.getElementById("PermText").innerHTML = "Permissions"
  }
  else{
    permselement.style.display = "none"
    permselement.style.lineHeight = "0px"
    document.getElementById("PermText").style.display = "none"
    document.getElementById("PermText").style.lineHeight = "0px"
  }
  document.getElementById("logoutBtn").style.display = "block";
}

function homepageredirect(){
  signOut();
  window.location.replace("/index.html");
}