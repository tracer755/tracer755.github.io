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
    axios.get('https://fair-gold-mussel-robe.cyclic.app/img:' + previewimg.split("/")[3])
    .then((response) => {
      console.log(previewimg + " - " + 'https://fair-gold-mussel-robe.cyclic.app/img:' + previewimg.split("/")[3] + "  -  " + response.data[0].url);
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
  if(token == ""){
    document.getElementById("statustext").innerHTML = "You aren't loged in please do so then try again";
    return;
  }

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



  axios.get('https://fair-gold-mussel-robe.cyclic.app/addpic:' + tokentype + "::" + token + "::" + document.getElementById("year").value + "::" + encodeURIComponent(document.getElementById("AlbumLinkInput").value) + "::" + encodeURIComponent(document.getElementById("ThumbnailLink").value) + "::" + document.getElementById("TitleInput").value + "::" + decsriptiontext)
    .then((response) => {
      console.log(response.data);
      if(response.data == "error"){
        document.getElementById("statustext").innerHTML = "An Error has occoured";
        document.getElementById("statustext").style = "color: red !important";
        return;
      }
      if(response.data == "repeat"){
        document.getElementById("statustext").innerHTML = "This entry already exists";
        return;
      }
      if(response.data == "no auth"){
        document.getElementById("statustext").innerHTML = "You are not authorized to use this tool. Naughty Naughty";
        document.getElementById("statustext").style = "color: red !important";
        return;
      }
      document.getElementById("statustext").innerHTML = "Success!";
      document.getElementById("statustext").style = "color: green !important";
      setTimeout(() => {  window.location.href = "pictures.html"; }, 1000);
    });


}






window.onload = function () {
  reloadpreview();
}

loaduserdata()
function loaduserdata() {
  if (token == "" || tokentype == '') {
    setTimeout(() => { loaduserdata() }, 500);
    return;
  }
  SetUserData();
}

function SetUserData() {
  document.getElementById("logintext").style.display = "none";
  document.getElementById("picturesLink").style.display = "block";
}


function LoadThumbnail(obj, link) {
  axios.get(link)
    .then((response) => {
      obj.src = response.data[0].url;
      console.log(obj.src);
      return response.data[0].url;
    });
}