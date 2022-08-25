let leftcontainer = document.getElementById("leftcontainer");
    let rightcontainer = document.getElementById("rightcontainer");
    
    loadcontactlist();
    
    function loadcontactlist(){
      axios.get("https://fair-gold-mussel-robe.cyclic.app/contactlist")
        .then(response => {
          response.data.collections.forEach(element => {
            let side = element.place;
            //generate the containers
            if(side == "left"){
              leftcontainer.innerHTML += `
              <div>
                <h3 id="${element.name}title"><strong>${element.name}</strong></h3>
                <br>
              </div>`;
            }
            else{
              rightcontainer.innerHTML += `
              <div>
                <h3 id="${element.name}title"><strong>${element.name}</strong></h3>
                <br>
              </div>`;
            }
            //load people in the list
            element.people.forEach(element => {
              if(side == "left"){
              leftcontainer.innerHTML += `
              <div id="${element.name}user">
                <h4>${element.name} - ${element.desc}</h4>
                <a class="whiteorangelink" target="_blank" href="mailto:${element.email}" style="position:relative; bottom:6px;"><h6 class="whiteorangelink">${element.email}</h6></a>
              </div>
              <br>
              `;
              }
              else{
                rightcontainer.innerHTML += `
              <div id="${element.name}user">
                <h4>${element.name} - ${element.desc}</h4>
                <a class="whiteorangelink" target="_blank" href="mailto:${element.email}" style="position:relative; bottom:6px;"><h6 class="whiteorangelink">${element.email}</h6></a>
              </div>
              <br>
              `;
              }

            })
            //check if this is the google group section if so inject the google groups code
            if(element.name == "Google Groups"){
              if(side == "left"){
                leftcontainer.innerHTML += `
                <div id="${element.name}user">
                  <a class="whiteorangelink" target="_blank" href="mailto:T456adults@googlegroups.com" style="position:relative; bottom:6px;"><h6 class="whiteorangelink">T456adults@googlegroups.com</h6></a>
                  <a class="whiteorangelink" target="_blank" href="mailto:T456Scouts@googlegroups.com" style="position:relative; bottom:6px;"><h6 class="whiteorangelink">T456Scouts@googlegroups.com</h6></a>
                </div>
                <br>
                `;
                }
              else{
                  rightcontainer.innerHTML += `
                <div id="${element.name}user">
                  <a class="whiteorangelink" target="_blank" href="mailto:T456adults@googlegroups.com" style="position:relative; bottom:6px;"><h6 class="whiteorangelink">T456adults@googlegroups.com</h6></a>
                  <a class="whiteorangelink" target="_blank" href="mailto:T456Scouts@googlegroups.com" style="position:relative; bottom:6px;"><h6 class="whiteorangelink">T456Scouts@googlegroups.com</h6></a>
                </div>
                <br>
                `;
              }
            }

            //add a space for the next section
            if(side == "left"){
              leftcontainer.innerHTML += `
                <br>
                `;
              }
              else{
                rightcontainer.innerHTML += `
                <br>
                `;
              }

          });
      })
    }
    