axios.get('https://cute-tan-bear-tie.cyclic.app/latest')
.then(function (response) {
    console.log(response.data);
    document.getElementById('recent-photo').src = response.data;
})


axios.get('https://cute-tan-bear-tie.cyclic.app/photos')
.then(function (response){
    const container = document.getElementById("photos");
    response.data.forEach(element => {
        var tmp = document.createElement('img');
        tmp.src = "https://d376cq2dh12qop.cloudfront.net/" + element.Key
        tmp.width = 400
        tmp.id = element.ETag
        tmp.classList.add("lightboxContent")
        container.appendChild(tmp)
        //container.innerHTML += "<img id=\"" + element.ETag + "\" src=\"https://d376cq2dh12qop.cloudfront.net/" + element.Key +"\" width=\"400\">"
        document.getElementById(element.ETag).onclick = () => {
            basicLightbox.create("<img width=\"1400\" height=\"900\" src=\"https://d376cq2dh12qop.cloudfront.net/"  + element.Key +"\">").show()
        }
    });
})