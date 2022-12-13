let token = ""
let user_id = ""
let auth = false

async function upload(){

    if(user_id == "" || token == ""){
        document.getElementById("label").innerHTML = "Login to twitch to upload prs photo"
        return;
    }

    document.getElementById("label").innerHTML = "Uploading..."
    var formData = new FormData();
    var imagefile = document.querySelector('#file');
    formData.append("image", imagefile.files[0]);
    const resp = await axios.post('https://cute-tan-bear-tie.cyclic.app/upload?user_id=' + user_id + "&auth=" + token, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    if(resp.data == "success"){
        document.getElementById("label").innerHTML = "Success! :D"
    }
    else if(resp.data == "error"){
        document.getElementById("label").innerHTML = "Error"
    }
}

let btn = document.getElementById("upload-button");
btn.addEventListener('click', event => {
    upload();
});

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

document.getElementById("twitch").href += makeid(30);

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);
  
    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

try{
    if(urlParams["code"] != undefined){
        console.log("Twitch code: " + urlParams["code"])

        axios.get('https://cute-tan-bear-tie.cyclic.app/checklogin?code=' + urlParams["code"])
        .then(function (response){
            if(response.data != "error"){
                document.getElementById("label").innerHTML = "Logged into twitch"
                auth = true
                token = response.data['token']
                user_id = response.data['user_id']
            }
            else{
                document.getElementById("label").innerHTML = "Error"
            }
        })
    }
    else{
        console.log("twitch code not detected");
    }
}
catch{
    console.log("twtich not valid");
}