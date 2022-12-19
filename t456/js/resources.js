loadfreeresources();
//load the resources that don't require login
function loadfreeresources(){
  let resourcecontainer = document.getElementById("freeresources");

  resourcecontainer.innerHTML = "";
  
  let json = '';

  axios.get("https://fair-gold-mussel-robe.cyclic.app/getfreeresources")
  .then(response => {
      json = response.data;
  

  console.log(json);

  json.sections.forEach(element => {
      
  

  let resourcetitletemplate = ` 
  <div class="flex-container editbuttons" id="editbuttons">
      <br>
      <button class="button-4" role="button" onclick="deletetile(${true}, '${element.title}')"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="filter: invert(100%)" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></button>
  </div>   
  <div id="${element.title.replace(/\s/g, '')}container">
      <h1 id="${element.title.replace(/\s/g, '')}title" style="padding-left:8px;">${element.title}</h1>
      <span class="rescourceline"></span>
      <br>

      <div id="${element.title.replace(/\s/g, '')}items" style="padding-top:15px;">

      </div>
  </div>
  `;

  resourcecontainer.innerHTML += resourcetitletemplate;

  let itemcontainerid = element.title.replace(/\s/g, '') + "items";
  element.documents.forEach(element => {

      if(element.url != ""){
          let linkitemtemplate = `       
          <div style="padding-top:12px; padding-bottom:12px; padding-left:6px;">
              <a class="orangelink" href="${element.url}" target="_blank"><h4 class="orangelink" style="color: white;">${element.title}</h4></a>
          </div>`;
          document.getElementById(itemcontainerid).innerHTML += linkitemtemplate;
      }
      else{
          let textitemtemplate = `        
          <div style="padding-top: 12px; padding-bottom:12px; padding-left:6px;">
              <h5 style="color: white;">${element.title}</h5>
          </div>`;
          document.getElementById(itemcontainerid).innerHTML += textitemtemplate;
      }
      
  })
  document.getElementById(itemcontainerid).innerHTML += `<br>`;
  });
  
})
}
edittoggle = false
function toggleeditbuttons() {
      console.log('Toggled edit buttons');
      const cards = document.getElementsByClassName("editbuttons");
      if (edittoggle) {
          for (var i = 0; i < cards.length; i++) {
              cards[i].classList.remove("editbuttonsshow")
              //Do something
          }
          edittoggle = false;
      }
      else if (!edittoggle) {
          for (var i = 0; i < cards.length; i++) {
              cards[i].classList.add("editbuttonsshow")
              //Do something
          }
          edittoggle = true;
      }
  }