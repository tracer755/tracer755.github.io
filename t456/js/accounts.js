var useritems = [];

let btn = document.getElementById("submitbtn");
    btn.addEventListener('click', event => {
  adduser();
});

function adduser(){

  if(document.getElementById("EmailInput").value == "" || document.getElementById("NameInput").value == ""){
    document.getElementById("statustext").innerHTML = "A critical value has been left blank";
    document.getElementById("statustext").style.display = "block";
    return;
  }



  axios.get('https://fair-gold-mussel-robe.cyclic.app/adduser:' + tokentype + "::" + token + "::" + document.getElementById("EmailInput").value.toLowerCase() + "::" + document.getElementById("edittoggle").checked + "::" + document.getElementById("accounttoggle").checked + "::" + document.getElementById("accttypeinput").value + "::" + document.getElementById("NameInput").value)
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
  if(document.getElementById("EmailInput2").value == ""){
    document.getElementById("statustext").innerHTML = "A critical value has been left blank";
    document.getElementById("statustext").style.display = "block";
    return;
  }

  axios.get('https://fair-gold-mussel-robe.cyclic.app/deluser:' + tokentype + "::" + token + "::" + document.getElementById("EmailInput2").value)
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
  if(useritems.length > 0){
    for (var i = 0; i < useritems.length; i++) {
      useritems[i].remove();
    }
  }
  axios.get('https://fair-gold-mussel-robe.cyclic.app/userlist:' + tokentype + "|" + token)
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
loaduserdata()
function loaduserdata(){
  if (token == "" || tokentype == '') {
    setTimeout(() => { loaduserdata() }, 500);
    return;
  }
  SetUserData();
}

function SetUserData() {
  document.getElementById("logintext").style.display = "none";
  document.getElementById("account header").style.display = "block";

  reloadUserList();
}
