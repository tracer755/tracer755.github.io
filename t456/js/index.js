var guser = '';

window.onload = function(){

    document.getElementById("loginNameText").style.display = "none";
    document.getElementById("loginUserIcon").style.display = "none";
  
  return;
  
  }
  
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
  
    let latch = true;
  
    axios.get('https://troop456loginapinodejs.herokuapp.com/email:' + profile.getEmail())
      .then(response => {
        console.log(response.data);
        if(response.data == "error"){
          console.log("Error / 404");
          signOut();
          latch = false;
          return;
        }
        if(response.data != "error"){
          console.log("loginSuccess");
          SetProfileData(googleUser);
          guser = googleUser;
        }
      })
  
  
  
  
      if(latch){
  
      }
  }
  
  function SetProfileData(googleUser){
    var profile = googleUser.getBasicProfile();
  
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    document.getElementById("loginButton").style.display = "none";
    document.getElementById("loginNameText").style.display = "block";
    document.getElementById("loginUserIcon").style.display = "block";
    document.getElementById("picturesLinkDash").style.display = "block";
    document.getElementById("picturesLink").style.display = "block";
  
    document.getElementById("loginNameText").innerHTML = profile.getName() + "";
    document.getElementById("loginUserIcon").src = profile.getImageUrl();
  }
  
  function signOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
        document.getElementById("loginButton").style.display = "block";
        document.getElementById("loginNameText").style.display = "none";
        document.getElementById("loginUserIcon").style.display = "none";
        document.getElementById("loginNameText").innerHTML = "N/A";
        document.getElementById("loginUserIcon").src = "";
        document.getElementById("picturesLink").style.display = "none";
      });
    }

    function hashCode(str) {
      return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
    }