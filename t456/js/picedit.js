let loadlatch = true;
let url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

(function () {
    let year_satart = 1961;
    let year_end = (new Date).getFullYear(); // current year
    let year_selected = year_end - 99999999;

    let option = '';
    option = '<option>Year</option>'; // first option

    for (let i = year_satart; i <= year_end; i++) {
        let selected = (i === year_selected ? ' selected' : '');
        option += '<option id="year' + i +'" value="' + i + '"' + selected + '>' + i + '</option>';
    }

    document.getElementById("year").innerHTML = option;
})();

loaduserdata()
function loaduserdata() {
  if (token == "" || tokentype == '') {
    setTimeout(() => { loaduserdata() }, 500);
    return;
  }
  loadimgedit();
}



function loadimgedit(){
    axios.get('https://troop456loginapinodejs.herokuapp.com/pictures:' + tokentype + "|" + token)
    .then(response => {
      if(response.data != "error"){
        response.data.forEach(element => {
            if(url[0] == element._id){
                console.log("Editing: " + element.Title);

                document.getElementById("year" + element.Year).selected = true;

                document.getElementById("TitleInput").value = element.Title;
                document.getElementById("Description").value = element.Description;
                document.getElementById("AlbumLinkInput").value = element.Link;
                document.getElementById("ThumbnailLink").value = element.Thumbnail;
            }
        })
      }
    })
}

let previewimg = '';
reloadpreview();

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


function submitedit(){
    axios.get('https://troop456loginapinodejs.herokuapp.com/editpic:' + tokentype + "::" + token + "::" + document.getElementById("year").value + "::" + encodeURIComponent(document.getElementById("AlbumLinkInput").value) + "::" + encodeURIComponent(document.getElementById("ThumbnailLink").value) + "::" + encodeURIComponent(document.getElementById("TitleInput").value) + "::" + encodeURIComponent(document.getElementById("Description").value) + "::" + encodeURIComponent(url[0]))
    .then(response => {
      if(response.data != "error"){
        console.log(response.data);
        document.getElementById("statustext").innerHTML = "Success!";
        document.getElementById("statustext").style = "color: green !important";
        setTimeout(() => {  window.location.href = "pictures.html"; }, 1000);
      }
    })
}