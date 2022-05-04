var guser = null;
var cardidtoggle = false;
var idlist = [];

function toggleidcards(){
  console.log('Toggled card id\'s');
  const cards = document.getElementsByClassName("itemid");
  if(cardidtoggle){
    for (var i = 0; i < idlist.length; i++) {
      idlist[i].querySelector('#itemid').style.display = "none";
      //Do something
    }
    cardidtoggle = false;
  }
  else if (!cardidtoggle){
    for (var i = 0; i < idlist.length; i++) {
      idlist[i].querySelector('#itemid').style.display = "block";
      //Do something
    }
    cardidtoggle = true;
  }
}

function ShowId(obj){
  obj.style = "color: white; display: block;";
}
function HideId(obj){
  obj.style = "color: white; display: none;";
}


function DeleteCard(){
  document.getElementById("delstatustext").style = "color: white";
  document.getElementById("delstatustext").innerHTML = "Submitting...";
  if(guser == null){
    document.getElementById("delstatustext").innerHTML = "You aren't signed in";
    return;
  }
  if(document.getElementById("objid").value == ""){
    document.getElementById("delstatustext").innerHTML = "Text box is empty";
    return;
  }
  var profile = guser.getBasicProfile();


  axios.get("https://troop456loginapinodejs.herokuapp.com/delpic:" + profile.getEmail() + "::" + document.getElementById("objid").value)
    .then(response => {
      if(response.data == "error"){
        document.getElementById("delstatustext").style = "color: red !important";
        document.getElementById("delstatustext").innerHTML = "Error";
        return;
      }
      document.getElementById("delstatustext").style = "color: green !important";
      document.getElementById("delstatustext").innerHTML = "Success!";
      console.log("Deleted card " + document.getElementById("objid").value + " succsessfully");
    });

}


let imageloadlatch = true;





window.onload = function () {

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

        //check for edit perms if user has perms show the edit menu
        if(response.data[0].Edit){
          document.getElementById("edittools").style.display = "block";
        }
        

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
  guser = googleUser;


  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  document.getElementById("loginButton").style.display = "none";
  document.getElementById("loginNameText").style.display = "block";
  document.getElementById("loginUserIcon").style.display = "block";
  document.getElementById("logintext").style.display = "none";
  document.getElementById("picturetext").style.display = "block";
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
    document.getElementById("logintext").style.display = "block";
    document.getElementById("picturetext").style.display = "none";
  });
}
function Load(googleUser) {
  var profile = googleUser.getBasicProfile();




  let picturecontainer = document.getElementById('picturecards');


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
      if (response.data != "error") {

        

        if(!imageloadlatch){
          return;
        }
        imageloadlatch = false;
        console.log(response.data);


        let year = new Date().getFullYear() + 1;


        let count = new Date().getFullYear() - 1960;



        let temp = 1;

        
        let currentrowcontainer = "";

        while (year > 1960) {

          let firstconainterlatch = true;

          let yearlatch = true;

          let imageItems = 0;

          for (i = 0; i < response.data.length; i++) {


            

            if (response.data[i].Year == year) {

              if (yearlatch) {
                let div2 = document.createElement('div');

                div2.innerHTML = `
<br>
<center>
<h1 id="sectionTitle" style="color:white"></h1>
<span class='yearline'></span>
</center>
<br>
<br>
`;


                document.body.appendChild(div2);

                div2.querySelector("#sectionTitle").innerHTML = "Outings - " + year;


                picturecontainer.appendChild(div2)
              }




              yearlatch = false;


if(((imageItems % 2) == 0)){

let div3 = document.createElement('div');

picturecontainer.appendChild(div3);

div3.classList.add("flex-container");

currentrowcontainer = div3;


}

if(firstconainterlatch){

let div3 = document.createElement('div');

picturecontainer.appendChild(div3);

div3.classList.add("flex-container");

currentrowcontainer = div3;

firstconainterlatch = false;


}


              imageItems++;



              let div = document.createElement('div');
              div.innerHTML = `
<center class="centerpadding">
<div class="featurebox" style="width: 20rem;">
  <a id="AlbumLink" target=”_blank” href="">
<img id="thumbnailimg" style="max-height: 300px !important;  max-width: 340px !important; border-radius: 2%;" alt="Album thumbnail" src="" referrerpolicy="no-referrer">
<h2 id="title" style="color:white">Title</h2>
<h4 id="desc" style="color:white">Description</h4>
</a>
<h5 class="itemid" id="itemid" style="color: white; display: none;"></h5>
</div>
</center>
`;




              var url = "";



              LoadThumbnail(div.querySelector("#thumbnailimg"), 'https://troop456loginapinodejs.herokuapp.com/img:' + response.data[i].Thumbnail.split("/")[3]);

              div.querySelector("#AlbumLink").href = response.data[i].Link;
              div.querySelector("#title").innerHTML = response.data[i].Title;
              div.querySelector("#desc").innerHTML = response.data[i].Description;
              div.querySelector('#itemid').innerHTML = response.data[i]._id;

              idlist.push(div);
              currentrowcontainer.appendChild(div);
              
              



            }



          }
          temp = temp + 1;
          year = year - 1;
        }




      }

    })







}


function LoadThumbnail(obj, link) {
  axios.get(link)
    .then((response) => {
      obj.src = response.data[0].url;
      return response.data[0].url;
    });
}