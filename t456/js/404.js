let bgImg = ["Img/404_Back3.webp", "Img/404_Back2.webp", "Img/404_Back3.webp", "Img/404_Back4.webp", "Img/404_Back5.webp", "Img/404_Back6.webp", "Img/404_Back3.webp"]
let ImgPointer = getRandomInt(bgImg.length);
document.getElementById("404Background").style.backgroundImage = "url('" + bgImg[ImgPointer] + "')";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}