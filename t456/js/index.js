var token = ""
var tokentype = ""

//user info
var username = ""
var email = ""
var profileimglink = ""
var userdata = ""
var loggedin = false

testcookielogin()
function testcookielogin(){
  if(document.cookie.match(new RegExp('(^| )' + "token" + '=([^;]+)')) == null){
    return
    //console.log(document.cookie.match(new RegExp('(^| )' + "token" + '=([^;]+)'))[2])
  }
  if (document.cookie.match(new RegExp('(^| )' + "tokentype" + '=([^;]+)')) == null) {
    return
    //console.log(document.cookie.match(new RegExp('(^| )' + "tokentype" + '=([^;]+)'))[2])
  }
  if (document.cookie.match(new RegExp('(^| )' + "profileimg" + '=([^;]+)')) == null) {
    return
    //console.log(document.cookie.match(new RegExp('(^| )' + "profileimg" + '=([^;]+)'))[2])
  }
  axios.get('https://troop456loginapinodejs.herokuapp.com/token:' + document.cookie.match(new RegExp('(^| )' + "tokentype" + '=([^;]+)'))[2] + "|" + document.cookie.match(new RegExp('(^| )' + "token" + '=([^;]+)'))[2])
    .then(response => {
      if(response.data != "error"){
        if (loggedin == false) {
          userdata = response.data[0]
          token = document.cookie.match(new RegExp('(^| )' + "token" + '=([^;]+)'))[2]
          tokentype = document.cookie.match(new RegExp('(^| )' + "tokentype" + '=([^;]+)'))[2]
          username = response.data[0].Name
          email = response.data[0].Email
          profileimglink = document.cookie.match(new RegExp('(^| )' + "profileimg" + '=([^;]+)'))[2]
          console.log("Logged in with cached token")
          SetProfileData()
        }
        loggedin = true
      }
    })
}


function onSignIn(googleUser) {
  axios.get('https://troop456loginapinodejs.herokuapp.com/token:' + 'g' + "|" + encodeURIComponent(googleUser.getAuthResponse().id_token))
    .then(response => {
      if (response.data == "error"){
        console.log("No auth or error  | 404")
        signOut()
        return;
      }
      else{
        if(loggedin == false){
          userdata = response.data[0]
          var profile = googleUser.getBasicProfile();
          token = googleUser.getAuthResponse().id_token
          tokentype = 'g'
          username = response.data[0].Name
          email = response.data[0].Email
          profileimglink = profile.getImageUrl()
          console.log("logged in with google")
          SetProfileData()
        }
        document.cookie = "token=" + token
        document.cookie = "tokentype=" + tokentype
        document.cookie = "username=" + username
        document.cookie = "email=" + email
        document.cookie = "profileimg=" + profileimglink
        loggedin = true
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
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  document.cookie = "tokentype=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
  document.cookie = "profileimg=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
}

function hashCode(str) {
  return str.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
}