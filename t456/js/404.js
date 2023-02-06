let bgImg = ["Img/404_Back1.jpg", "Img/404_Back2.jpg", "Img/404_Back3.jpg", "Img/404_Back4.jpg", "Img/404_Back5.jpg"]
let ImgPointer = getRandomInt(bgImg.length);
document.getElementById("404Background").style.backgroundImage = "url('" + bgImg[ImgPointer] + "')";
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}