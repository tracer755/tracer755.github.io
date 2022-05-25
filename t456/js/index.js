var token = ""
var tokentype = ""

//user info
var username = ""
var email = ""
var profileimglink = ""
var userdata = ""
  
function onSignIn(googleUser) {
  axios.get('https://troop456loginapinodejs.herokuapp.com/token:' + 'g' + "|" + encodeURIComponent(googleUser.getAuthResponse().id_token))
    .then(response => {
      console.log(response.data)
      if (response.data == "error"){
        console.log("No auth or error  | 404")
        signOut()
        return;
      }
      else{
        userdata = response.data[0]
        var profile = googleUser.getBasicProfile();
        token = googleUser.getAuthResponse().id_token
        tokentype = 'g'
        username = response.data[0].Name
        email = response.data[0].Email
        profileimglink = profile.getImageUrl()
        SetProfileData()
      }
    })
}
  
function SetProfileData(){
  console.log("Welcome " + username);
  //set user info
  document.getElementById("loginButton").style.display = "none";
  document.getElementById("userbar").style.display = "flex";
  document.getElementById("loginNameText").innerHTML = username;
  document.getElementById("loginUserIcon").src = profileimglink;

  //set navbar links
  document.getElementById("picturesLinkDash").style.display = "block";
  document.getElementById("picturesLink").style.display = "block";
}
  
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    document.getElementById("loginButton").style.display = "block";
    document.getElementById("userbar").style.display = "none";
    document.getElementById("picturesLinkDash").style.display = "none";
    document.getElementById("picturesLink").style.display = "none";
  });
}

function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}