let loadsbcdlatch = true;
loadupcomingscoutbookdatatopage();

function loadupcomingscoutbookdatatopage() {
  if (scoutbookcaljson == "") {
    setTimeout(() => {
      loadupcomingscoutbookdatatopage();
    }, 500);
    return;
  }
  if (loadsbcdlatch == false) {
    return;
  }
  loadsbcdlatch = false;

  //load scoutbook data to the page
  let currentmonth = "";
  //numbertomonth()
  let eventcontainer = document.getElementById("upcomingevents");
  scoutbookcaljson.Events.forEach(element => {
    if (monthtonumber(element.DtStart.split("T")[0].split(" ")[1]) >= (new Date().getUTCMonth() + 1 + 4)) {
      return;
    }
    if (monthtonumber(element.DtEnd.split("T")[0].split(" ")[1]) == new Date().getUTCMonth() + 1) {
      if (element.DtStart.split("T")[0].split(" ")[2] < (new Date().getDate())) {
        return;
      }
    }
    if (element.DtStart.split("T")[0].split(" ")[1] != currentmonth) {
      currentmonth = element.DtStart.split("T")[0].split(" ")[1];
      let datetemplatehtml = `
        <br>
        <strong><h3>${element.DtStart.split("T")[0].split(" ")[1] + ":"}</h3><strong>
        `;
      eventcontainer.innerHTML += datetemplatehtml;
    }
    let desc = String(element.Description).split("\\n\\nFor more information please visit:")[0].replace(/\\n/g, "<br>");
    desc = desc.split("\\").join("");
    let datetime = "";

    if (element.DtStart.split("T")[0].split(" ")[2] == element.DtEnd.split("T")[0].split(" ")[2]) {
      datetime = element.DtStart.split("T")[0].split(" ")[1] + " " + element.DtStart.split("T")[0].split(" ")[2] + " " + hourparser(element.DtStart.split("T")[1].split(" ")[0], element.DtStart.split("T")[1].split(" ")[1]) + " to " + hourparser(element.DtEnd.split("T")[1].split(" ")[0], element.DtEnd.split("T")[1].split(" ")[1]);
    } else {
      datetime = element.DtStart.split("T")[0].split(" ")[1] + " " + element.DtStart.split("T")[0].split(" ")[2] + " " + hourparser(element.DtStart.split("T")[1].split(" ")[0], element.DtStart.split("T")[1].split(" ")[1]) + " to " + element.DtEnd.split("T")[0].split(" ")[1] + " " + element.DtEnd.split("T")[0].split(" ")[2] + " " + hourparser(element.DtEnd.split("T")[1].split(" ")[0], element.DtEnd.split("T")[1].split(" ")[1]);
    }
    eventcontainer.innerHTML += `
    <div id="eventitem">
        <div style="padding-left:20px;" onclick="colapsable('content${hashCode(element.Summary + element.Description)}')">
            <h4 style="padding:2px%">${element.Summary}</h4>
        </div>
        <div style="" class="hidebox content content${hashCode(element.Summary + element.Description)} collapse show">
            <center style="padding-top:5px; padding-left: 15px; padding-right: 15px;">
                <h5>${element.Summary}</h5>
                <h6>Date: ${datetime}<h6>
                <span class="splitline1"></span>
                <br>
                <h6>${desc}</h6>
                <span class="splitline1"></span>
                <h6 style="width: 100%;">For more information or to rsvp: <a class="orangelink" target="_blank" href="${element.Url.replace("HTTPS", "https")}">Click here</a></h6>
            </center>
        <br>
        </div>
    </div>
    `;
    $(`.content${hashCode(element.Summary + element.Description)}`).collapse("show")
    $(`.content${hashCode(element.Summary + element.Description)}`).collapse("hide")
    let eventtemplatehtml = ``;
  })

}

function colapsable(id) {
  let item = document.getElementsByClassName(id);
  item[0].classList.remove("hidebox");
  if (item[0].classList[3] == "show")
    $("." + id).collapse("hide")
  else
    $("." + id).collapse("show")
}

function hourparser(hour, min) {
  if (hour == "12")
    return ("12:" + min + " PM");
  if (hour == "24")
    return ("12:" + min + " AM");
  if (hour > 12)
    return (hour - 12 + ":" + min + " PM");
  if (hour < 12)
    return (hour + ":" + min + " AM")
}