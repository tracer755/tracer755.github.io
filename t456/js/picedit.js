let loadlatch = true;
let url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
let id = "";

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
    axios.get('https://fair-gold-mussel-robe.cyclic.app/pictures?type=' + tokentype + "&token=" + token)
    .then(response => {
      if(response.data != "error"){
        response.data.forEach(element => {
            if(url[0] == element._id){
                console.log("Editing: ");
                console.log(element);
                id = element._id;
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
      axios.get('https://fair-gold-mussel-robe.cyclic.app/img?link=' + previewimg)
      .then((response) => {
        console.log('https://fair-gold-mussel-robe.cyclic.app/img?link=' + previewimg);
        document.getElementById("thumbnailimg").src = response.data;
      });
    }
      document.getElementById("AlbumLink").href = document.getElementById("AlbumLinkInput").value;
      document.getElementById("title").innerHTML = document.getElementById("TitleInput").value;
      document.getElementById("desc").innerHTML = document.getElementById("Description").value;
  
    setTimeout(() => {  reloadpreview(); }, 1000);
}
function submitedit(){
  document.getElementById("statustext").innerHTML = "Submitting";
  url = "https://fair-gold-mussel-robe.cyclic.app/editpic?type=" + tokentype + "&token=" + token;
  url += "&year=" + document.getElementById("year").value;
  url += "&link=" + encodeURIComponent(document.getElementById("AlbumLinkInput").value);
  url += "&thumbnaillink=" + encodeURIComponent(document.getElementById("ThumbnailLink").value);
  url += "&title=" + encodeURIComponent(document.getElementById("TitleInput").value);
  url += "&desc=" + encodeURIComponent(document.getElementById("Description").value);
  url += "&id=" + encodeURIComponent(id)
  axios.get(url)
  .then(response => {
    if(response.data != "error"){
      console.log(response.data);
      document.getElementById("statustext").innerHTML = "Success!";
      document.getElementById("statustext").style = "color: green !important";
      setTimeout(() => {  window.location.href = "pictures.html"; }, 1500);
    }
    else if(response.data == "no auth"){
      document.getElementById("statustext").innerHTML = "You do not have access to this. Naughty Naughty";
      document.getElementById("statustext").style = "color: red !important";
    }
    else if(response.data == "error"){
      document.getElementById("statustext").innerHTML = "An Error has occoured";
      document.getElementById("statustext").style = "color: red !important";
    }
  })
}