const FooterIdName = "sitefooter"
const HeaderIdName = "SiteHeader"


//inject divs
document.body.innerHTML = `<div id="SiteHeader"></div>` + document.body.innerHTML
document.body.innerHTML += `<div id="sitefooter"></div>`


let FooterContainer = document.getElementById(FooterIdName)
let HeaderContainer = document.getElementById(HeaderIdName)

let HeaderCode = `  
<!--Page Header start-->
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark" style="background-color:#080808 !important;">
    <div class="container-fluid">
      <a class="navbar-brand" href="/"><img class="circle" src="img/BulletDrop Studios.png" alt="BDSLogo" width="75" height="75"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item" style="padding-right: 10px; padding-top:30px;">
            <a class="nav-link" href="/games">
              <h3 class="textnavbar">Games</h3>
            </a>
          </li>
          <li class="nav-item" style="padding-right: 10px; padding-top:30px;">
            <a class="nav-link" href="/about">
              <h3 class="textnavbar">About</h3>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!--Page header end-->
  <div style="background: linear-gradient(#080808, #1d1e28);">
    <br>
  </div>
  `

let FooterCode = ``

//inject headers/footers
FooterContainer.innerHTML = FooterCode
HeaderContainer.innerHTML = HeaderCode