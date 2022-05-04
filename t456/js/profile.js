let latch = true;
    checkguser();
    function checkguser(){
      if(latch){
        try {
          if(guser != ''){
            loadprofiledata();
            latch = false;
          }
        }
        catch (error) {
        }
      }
      if(latch){
      setTimeout(() => {  checkguser(); }, 500);
      }
    }

    let profilepic = document.getElementById("profileimg");
    let usernameelement = document.getElementById("usernameplace");
    let emailelement = document.getElementById("emailplace");
    let accountelement = document.getElementById("accounttypeplace");
    let permselement = document.getElementById("permsplace");

    function loadprofiledata(){
      var profile = guser.getBasicProfile();
      profilepic.src = profile.getImageUrl();
      usernameelement.innerHTML = profile.getName();
      emailelement.innerHTML = profile.getEmail();

      axios.get("https://troop456loginapinodejs.herokuapp.com/email:" + profile.getEmail())
        .then(response => {
          accountelement.innerHTML = "Account Type: " + response.data[0].Type;

          let permcount = 0;
          if(response.data[0].Edit == "true"){
            permselement.innerHTML += "Edit,  "
            permcount++;
          }
          if(response.data[0].AccountControl == "true"){
            permselement.innerHTML += "AccountControl,  "
            permcount++;
          }

          //if no perms
          if(permcount == 0){
            permselement.innerHTML += "None"
          }
        })
    }