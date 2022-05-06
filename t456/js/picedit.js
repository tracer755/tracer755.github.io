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

gusercheck();

function gusercheck(){
    if(guser != ''){
        loadimgedit();
        loadlatch = false;
    }
    if(loadlatch){
        setTimeout(() => {  gusercheck() }, 500);
    }
}


function loadimgedit(){
    var profile = guser.getBasicProfile();
    
    console.log(url[0]);

    axios.get('https://troop456loginapinodejs.herokuapp.com/pictures:' + profile.getEmail())
    .then(response => {
      if (response.data == "error") {
        console.log("Error / 404");
        signOut();
        latch = false;
        return;
      }
      else if(response.data != "error"){
        response.data.forEach(element => {
            if(url[0] == element._id){
                console.log(element.Title);

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
    var profile = guser.getBasicProfile();
    axios.get('https://troop456loginapinodejs.herokuapp.com/editpic:' + profile.getEmail() + "::" + document.getElementById("year").value + "::" + encodeURIComponent(document.getElementById("AlbumLinkInput").value) + "::" + encodeURIComponent(document.getElementById("ThumbnailLink").value) + "::" + encodeURIComponent(document.getElementById("TitleInput").value) + "::" + encodeURIComponent(document.getElementById("Description").value) + "::" + encodeURIComponent(url[0]))
    .then(response => {
      if (response.data == "error") {
        console.log("Error / 404");
        signOut();
        latch = false;
        return;
      }
      else if(response.data != "error"){
        console.log(response.data)
      }
    })
}