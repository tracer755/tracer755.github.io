function myFunction(c) {
  var img = document.getElementById(c);
    if(img.getAttribute("class") === "rotated-image"){
    img.setAttribute("class", "normal-image");
      return;
  }
  img.setAttribute("class", "rotated-image");


  
      
  
}