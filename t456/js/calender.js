let scoutbookcaljson = "";
let testing = '';
loadscoutbookcal();

function loadscoutbookcal(){
  axios.get("https://troop456loginapinodejs.herokuapp.com/getscoutbookcal")
    .then(response => {
      let json = { Events: []};

      response.data.VCALENDAR[0].VEVENT.forEach(element => {
        let tempjson = 
        JSON.parse(`{
          "DtStart":"",
          "DtEnd":"",
          "Summary":"",
          "Location":"",
          "Description":"",
          "Url":""
        }`);
        let dateString = "";
        let timeString = "";
        try{
          dateString = element["DTSTART;TZID=America/Denver"].split("T")[0];
          timeString = element["DTSTART;TZID=America/Denver"].split("T")[1];
        }
        catch{
          dateString = element["DTSTART;VALUE=DATE"].split("T")[0];
          timeString = element["DTSTART;VALUE=DATE"].split("T")[1];
        }

        let year = dateString.substring(0, 4);
        let month = dateString.substring(4, 6);
        let day = dateString.substring(6, 8);


        let date = "";
        try{
          let hour = timeString.substring(0, 2);
          let min = timeString.substring(2, 4);
          if(hour == 10 || hour == 20){
            date = year + " " + numbertomonth(month) + " " + day + "T" + hour + " " + min;
          }
          else{
            date = year + " " + numbertomonth(month) + " " + day + "T" + hour.replace("0", "") + " " + min;
          }
        }
        catch{
          date = year + " " + numbertomonth(month) + " " + day + "T";
        }
        tempjson.DtStart = date;
        tempjson.Summary = element.SUMMARY;
        tempjson.Description = element.DESCRIPTION;
        tempjson.Location = element.LOCATION;
        tempjson.Url = element.URL;


        try{
          dateString = element["DTEND;TZID=America/Denver"].split("T")[0];
          timeString = element["DTEND;TZID=America/Denver"].split("T")[1];
        }
        catch{
          dateString = element["DTEND;VALUE=DATE"].split("T")[0];
          timeString = element["DTEND;VALUE=DATE"].split("T")[1];
        }

        year = dateString.substring(0, 4);
        month = dateString.substring(4, 6);
        day = dateString.substring(6, 8);

        try{
          let hour = timeString.substring(0, 2);
          let min = timeString.substring(2, 4);
          let sec = timeString.substring(4, 6);
          
          
          if(hour == "10" || hour == "20"){
            date = year + " " + numbertomonth(month) + " " + day + "T" + hour + " " + min;
          }
          else{
            date = year + " " + numbertomonth(month) + " " + day + "T" + hour.replace("0", "") + " " + min;
          }
        }
        catch{
          date = new Date(year, month - 1, day);
        }
        tempjson.DtEnd = date;
        if(month >= new Date().getMonth() + 1){
        json.Events.push(tempjson);
        }
        
      });
      let string1 = JSON.stringify(json);
      var parsed = JSON.parse(string1);  

      scoutbookcaljson = parsed;
      console.log(parsed);
    })
}