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

function deletecardbutton(){
  DeleteCard(document.getElementById("objid").value);
}

function DeleteCard(id){
  console.log(id);
document.getElementById("delstatustext").style = "color: white";
document.getElementById("delstatustext").innerHTML = "Submitting...";
if(token == ""){
 document.getElementById("delstatustext").innerHTML = "You aren't signed in";
 return;
}
if(document.getElementById("objid").value == ""){
 document.getElementById("delstatustext").innerHTML = "Text box is empty";
 return;
}


axios.get("https://fair-gold-mussel-robe.cyclic.app/delpic:" + tokentype + "::" + token + "::" + id)
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

function CardDelete(id){

  if (confirm("Are you sure you want to delete this card?") == true) {
  } else {
    return;
  }

  if(token == ""){
  document.getElementById("delstatustext").innerHTML = "You aren't signed in";
  return;
  }


  axios.get("https://fair-gold-mussel-robe.cyclic.app/delpic?type=" + tokentype + "&token=" + token + "&id=" + id)
  .then(response => {
    if(response.data == "error"){
        console.log("error could not delete card");
      return;
    }
      console.log("Deleted card succsessfully");
      document.getElementById(id).innerHTML = "";
  });

}

let imageloadlatch = true;

var loaddata = true

loadpictures()

function loadpictures(){
  if(token == "" || tokentype == ''){
    setTimeout(() => { loadpictures(); }, 500);
    return;
  }
  if (userdata.Edit == "true") {
    document.getElementById("edittools").style.display = "block";
  }
  SetUserData();
  LoadImg();
}

function SetUserData() {
  document.getElementById("logintext").style.display = "none";
  document.getElementById("picturetext").style.display = "block";
}
function LoadImg() {


  let picturecontainer = document.getElementById('picturecards');



  axios.get('https://fair-gold-mussel-robe.cyclic.app/pictures?type=' + tokentype + '&token=' + token)
    .then(response => {
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
<center class="centerpadding" id="${response.data[i]._id}">
<div class="featurebox" style="width: 20rem;">
  <a id="AlbumLink" target=”_blank” href="">
<img id="thumbnailimg" style="max-height: 300px !important;  max-width: 340px !important; border-radius: 2%;" alt="Album thumbnail" src="" referrerpolicy="no-referrer">
<h2 id="title" style="color:white">Title</h2>
<h4 id="desc" style="color:white">Description</h4>
</a>
<h5 class="itemid" id="itemid" style="color: white; display: none;"></h5>
<div class="flex-container editbuttons" id="editbuttons">
  <a href="picedit.html?${response.data[i]._id}"><button class="button-3" role="button"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="filter: invert(100%)" viewBox="0 0 24 24"><path d="M18.308 0l-16.87 16.873-1.436 7.127 7.125-1.437 16.872-16.875-5.691-5.688zm-15.751 21.444l.723-3.585 12.239-12.241 2.861 2.862-12.239 12.241-3.584.723zm17.237-14.378l-2.861-2.862 1.377-1.377 2.861 2.861-1.377 1.378z"/></svg></button></a>
  <span style="width:10px;"></span>
  <button class="button-4" role="button" onclick="CardDelete('${response.data[i]._id}')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="filter: invert(100%)" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></button>
</div>
</div>
</center>
`;




              var url = "";



              //LoadThumbnail(div.querySelector("#thumbnailimg"), 'https://fair-gold-mussel-robe.cyclic.app/img:' + response.data[i].Thumbnail.split("/")[3]);

              div.querySelector("#thumbnailimg").src = response.data[i].ThumbnailImg;
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
var editbuttontoggle = false;
function toggleeditbuttons(){


  console.log('Toggled card edit buttons');
  const cards = document.getElementsByClassName("editbuttons");
  if(cardidtoggle){
    for (var i = 0; i < idlist.length; i++) {
      idlist[i].querySelector('#editbuttons').style.display = "none";
    }
    cardidtoggle = false;
  }
  else if (!cardidtoggle){
    for (var i = 0; i < idlist.length; i++) {
      idlist[i].querySelector('#editbuttons').style.display = "block";
    }
    cardidtoggle = true;
  }
}