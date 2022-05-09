showadminitems();
      function showadminitems(){
        if(guser == ''){
            setTimeout(() => {  showadminitems(); }, 500);
            return;
        }
        var profile = guser.getBasicProfile();
        axios.get('https://troop456loginapinodejs.herokuapp.com/email:' + profile.getEmail())
            .then(response => {
                if(response.data == "error"){
                    console.log("Error / 404");
                    signOut();
                    latch = false;
                    return;
                }
                if(response.data != "error"){
                    if(response.data[0].Edit == "true"){
                        document.getElementById("edittools").style.display = "block";
                    }
                    if(response.data[0].AccountControl == "true"){
                        document.getElementById("accounttools").style.display = "block";
                    }
                }
            })
      }