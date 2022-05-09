var guser = null;



(function () {
    let year_satart = 1961;
    let year_end = (new Date).getFullYear(); // current year
    let year_selected = year_end;

    let option = '';
    option = '<option>Year</option>'; // first option

    for (let i = year_satart; i <= year_end; i++) {
        let selected = (i === year_selected ? ' selected' : '');
        option += '<option value="' + i + '"' + selected + '>' + i + '</option>';
    }

    document.getElementById("year").innerHTML = option;
})();

previewimg = "";


function reloadpreview(){
  if(document.getElementById("ThumbnailLink").value != previewimg){
    previewimg = document.getElementById("ThumbnailLink").value;
    axios.get('https://troop456loginapinodejs.herokuapp.com/img:' + previewimg.split("/")[3])
    .then((response) => {
      console.log(previewimg + " - " + 'https://troop456loginapinodejs.herokuapp.com/img:' + previewimg.split("/")[3] + "  -  " + response.data[0].url);
      document.getElementById("thumbnailimg").src = response.data[0].url;
    });
  }
    document.getElementById("AlbumLink").href = document.getElementById("AlbumLinkInput").value;
    document.getElementById("title").innerHTML = document.getElementById("TitleInput").value;
    document.getElementById("desc").innerHTML = document.getElementById("Description").value;

  setTimeout(() => {  reloadpreview(); }, 1000);
}

let btn = document.getElementById("btn");
btn.addEventListener('click', event => {
submitimg();
});

function submitimg(){
  document.getElementById("statustext").style = "color: white";
  //check to make sure user is logged in
  if(guser == null){
    document.getElementById("statustext").innerHTML = "You aren't loged in please do so then try again";
    return;
  }

  var profile = guser.getBasicProfile();
  var decsriptiontext = "";

  if(document.getElementById("Description").value == ""){
    decsriptiontext = "blank";
  }
  else{
    decsriptiontext = document.getElementById("Description").value;
  }
  document.getElementById("statustext").innerHTML = "Submiting...";

  if(document.getElementById("AlbumLinkInput").value == ""){
    document.getElementById("statustext").innerHTML = "A critical value has been left blank";
    return;
  }
  if(document.getElementById("ThumbnailLink").value == ""){
    document.getElementById("statustext").innerHTML = "A critical value has been left blank";
    return;
  }
  if(document.getElementById("TitleInput").value == ""){
    document.getElementById("statustext").innerHTML = "A critical value has been left blank";
    return;
  }



  axios.get('https://troop456loginapinodejs.herokuapp.com/addpic:' + profile.getEmail() + "::" + document.getElementById("year").value + "::" + encodeURIComponent(document.getElementById("AlbumLinkInput").value) + "::" + encodeURIComponent(document.getElementById("ThumbnailLink").value) + "::" + document.getElementById("TitleInput").value + "::" + decsriptiontext)
    .then((response) => {
      console.log(response.data);
      if(response.data == "error"){
        document.getElementById("statustext").innerHTML = "An Error has occoured";
        return;
      }
      if(response.data == "repeat"){
        document.getElementById("statustext").innerHTML = "This entry already exists";
        return;
      }
      if(response.data == "no auth"){
        document.getElementById("statustext").innerHTML = "You are not authorized to use this tool. Naughty Naughty";
        return;
      }
      document.getElementById("statustext").style = "color: green";
      document.getElementById("statustext").innerHTML = "Success!";
    });


}






window.onload = function () {
  reloadpreview();

  return;

}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();

  guser = googleUser;

  let latch = true;

  axios.get('https://troop456loginapinodejs.herokuapp.com/email:' + profile.getEmail())
    .then(response => {
      console.log(response.data);
      if (response.data == "error") {
        console.log("Error / 404");
        signOut();
        latch = false;
        return;
      }
      if (response.data != "error") {
        console.log("loginSuccess");
        SetProfileData(googleUser);
        Load(googleUser);
      }
    })




  if (latch) {

  }
}

function SetProfileData(googleUser) {
  var profile = googleUser.getBasicProfile();

  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  document.getElementById("loginButton").style.display = "none";
  document.getElementById("loginNameText").style.display = "block";
  document.getElementById("loginUserIcon").style.display = "block";
  document.getElementById("logintext").style.display = "none";
  document.getElementById("picturesLink").style.display = "block";
  document.getElementById("picturesLinkDash").style.display = "block";

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
    document.getElementById("logintext").style.display = "block";
    document.getElementById("picturetext").style.display = "none";
  });
}
function Load(googleUser) {
  var profile = googleUser.getBasicProfile();







  axios.get('https://troop456loginapinodejs.herokuapp.com/pictures:' + profile.getEmail())
    .then(response => {
      if (response.data == "error") {
        console.log("Error / 404");
        document.getElementById("alertFail").style.opacity = "1";
        document.getElementById("alertFail").style.display = "block";
        signOut();
        latch = false;
        return;
      }
      if (
      response.data != "error") {
      }
    })
}



function LoadThumbnail(obj, link) {
  axios.get(link)
    .then((response) => {
      obj.src = response.data[0].url;
      console.log(obj.src);
      return response.data[0].url;
    });
}