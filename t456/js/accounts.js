var guser = null;
var useritems = [];

let btn = document.getElementById("submitbtn");
    btn.addEventListener('click', event => {
  adduser();
});

    function adduser(){
      var profile = guser.getBasicProfile();

      if(document.getElementById("EmailInput").value == "" || document.getElementById("NameInput").value == ""){
        document.getElementById("statustext").innerHTML = "A critical value has been left blank";
        document.getElementById("statustext").style.display = "block";
        return;
      }



      axios.get('https://troop456loginapinodejs.herokuapp.com/adduser:' + profile.getEmail() + "::" + document.getElementById("EmailInput").value + "::" + document.getElementById("edittoggle").checked + "::" + document.getElementById("accounttoggle").checked + "::" + document.getElementById("accttypeinput").value + "::" + document.getElementById("NameInput").value)
        .then(response => {
          if(response.data == "error"){
            document.getElementById("statustext").innerHTML = "error";
            document.getElementById("statustext").style.display = "block";
            return;
          }
          if(response.data == "edit success"){
            document.getElementById("statustext").innerHTML = "Account successfuly edited";
            document.getElementById("statustext").style.display = "block";
            console.log(response.data);
            return;
          }
          document.getElementById("statustext").innerHTML = "Account creation success";
          document.getElementById("statustext").style.display = "block";
          console.log(response.data);
        })
        setTimeout(() => {reloadUserList();}, 500);
    }

    let btn2 = document.getElementById("delbtn");
btn2.addEventListener('click', event => {

  deleteuser();
});

    function deleteuser(){
      var profile = guser.getBasicProfile();
      if(document.getElementById("EmailInput2").value == ""){
        document.getElementById("statustext").innerHTML = "A critical value has been left blank";
        document.getElementById("statustext").style.display = "block";
        return;
      }

      axios.get('https://troop456loginapinodejs.herokuapp.com/deluser:' + profile.getEmail() + "::" + document.getElementById("EmailInput2").value)
        .then(response => {
          if(response.data == "error"){
            document.getElementById("statustext").innerHTML = "error";
            document.getElementById("statustext").style.display = "block";
            return;
          }
          document.getElementById("statustext").innerHTML = "Account deletion success";
          document.getElementById("statustext").style.display = "block";
          console.log(response.data);
        })
        setTimeout(() => {reloadUserList();}, 500);
    }
    let btn3 = document.getElementById("reloadbtn");
btn3.addEventListener('click', event => {

  reloadUserList();
});

    function reloadUserList(){
      var profile = guser.getBasicProfile();
      if(useritems.length > 0){
        for (var i = 0; i < useritems.length; i++) {
          useritems[i].remove();
        }
      }
      axios.get('https://troop456loginapinodejs.herokuapp.com/userlist:' + profile.getEmail())
      .then(response => {
        if(response.data == "error"){
          return;
        }
        console.log(response.data);


        for (var i = 0; i < response.data.length; i++) {


          var usercontainer = document.getElementById("accountlist");


          let div = document.createElement('div');

          div.classList.add('flex-container');

          div.innerHTML = `
            <h5 id="emailtext" style="float: left; color: white; padding-right: 20px; padding-left: 16px;">Email</h5>
            <h5 id="username" style="float: left; color: white; padding-right: 20px; padding-left: 16px;">Name</h5>
            <h5 id="editpermtext" style="float: left; color: white; padding-right: 20px; padding-left: 16px;">Edit Perms</h5>
            <h5 id="accountpermtext" style="float: left; color: white; padding-right: 20px; padding-left: 16px;">Account Prems</h5>
            <h5 id="accounttypetext" style="float: left; color: white; padding-right: 20px; padding-left: 16px;">Account type</h5>`;


          document.getElementById("accountlist").appendChild(div);

          div.querySelector("#emailtext").innerHTML = response.data[i].Email;
          div.querySelector("#username").innerHTML = response.data[i].Name;
          div.querySelector("#editpermtext").innerHTML = response.data[i].Edit;
          div.querySelector("#accountpermtext").innerHTML = response.data[i].AccountControl;
          div.querySelector("#accounttypetext").innerHTML = response.data[i].Type;

          div.style["padding-bottom"] = "10px";

          useritems.push(div);
        }



      })





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
          }
        })
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
      document.getElementById("account header").style.display = "block";
      document.getElementById("picturesLink").style.display = "block";
      document.getElementById("picturesLinkDash").style.display = "block";

      document.getElementById("loginNameText").innerHTML = profile.getName() + "";
      document.getElementById("loginUserIcon").src = profile.getImageUrl();

      reloadUserList();
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