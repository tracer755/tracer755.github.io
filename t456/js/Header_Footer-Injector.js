const FooterIdName = "sitefooter"
const HeaderIdName = "SiteHeader"



//inject divs
document.body.innerHTML = `<div id="SiteHeader"></div>` + document.body.innerHTML
document.body.innerHTML += `<div id="sitefooter"></div>`


let FooterContainer = document.getElementById(FooterIdName)
let HeaderContainer = document.getElementById(HeaderIdName)

const FooterCode = `
<footer id="footer" class="footer-1">
<div class="main-footer widgets-dark typo-light">
<div class="container">
<div class="row">
  
<div class="col-xs-12 col-sm-6 col-md-3">
<div class="widget subscribe no-box">
<h3 class="widget-title">Troop 456<span></span></h3>
<p>A boy scout troop based in littleton</p>
</div>
</div>

<div class="col-xs-12 col-sm-6 col-md-3">
<div class="widget no-box">
<h5 class="widget-title">Quick Links<span></span></h5>
<ul class="thumbnail-widget">
<li>
<div class="thumb-content"><a class="texthover" href="resources.html">Resources</a></div>	
</li>
<li>
<div class="thumb-content"><a class="texthover" href="news.html">News</a></div>	
</li>
<li>
<div class="thumb-content"><a href="Information.html">About</a></div>	
</li>
</ul>
</div>
</div>

<div class="col-xs-12 col-sm-6 col-md-3">
<div class="widget no-box">
<h5 class="widget-title">Get Started<span></span></h5>
<ul class="thumbnail-widget">
<li>
<p>If you are a boy 11 - 18 years old</p>
</li>
<li>
<p>We would love to have you join out troop!</p>
</li>
<li>
<div class="thumb-content"><a href="troop-contact.html">Get in touch</a></div>	
</li>
</ul>
</div>
</div>

<div class="col-xs-12 col-sm-6 col-md-3">

<div class="widget no-box">
<h5 class="widget-title">Contact Us<span></span></h5>

<p><a class="hovertext" href="troop-contact.html" title="glorythemes">Contact</a></p>

    <br><br><br>
    <p style="float: right; color: #757c8a; position:relative; left:6px; thumb-content;">Made with ♥️ By Tracer755</p>
</ul>
</div>
</div>

</div>
</div>
</div>

</footer>`

const HeaderCode = `
<!--Page Header start-->
<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="index.html"><img class="circle" src="Img/MainLogo.png" alt="TroopLogo" width="75" height="75"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="index.html"><h2 class="navbartext" style="font-family: "Lucida Console", "Courier New", monospace;">Troop 456</h2></a>
        </li>
        <li class="nav-item">
          <h2 class="nav-link navbartext navdash" style="font-family: "Lucida Console", "Courier New", monospace;">-</h2>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="resources.html"><h2 class="navbartext" style="font-family: "Lucida Console", "Courier New", monospace;">Resources</h2></a>
        </li>
        <li class="nav-item">
          <h2 class="nav-link navbartext navdash" style="font-family: "Lucida Console", "Courier New", monospace;">-</h2>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="news.html"><h2 class="navbartext" style="font-family: "Lucida Console", "Courier New", monospace;">News</h2></a>
        </li>
        <li class="nav-item">
          <h2 class="nav-link navbartext navdash" style="font-family: "Lucida Console", "Courier New", monospace;">-</h2>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="upcoming.html"><h2 class="navbartext" style="font-family: "Lucida Console", "Courier New", monospace;">Events</h2></a>
        </li>
        <li id="picturesLinkDash" class="nav-item" style="display: none;">
          <h2 class="nav-link navbartext navdash" style="font-family: "Lucida Console", "Courier New", monospace;">-</h2>
        </li>
        <li id="picturesLink" class="nav-item" style="display: none;">
          <a class="nav-link" href="pictures.html"><h2 class="navbartext" style="font-family: "Lucida Console", "Courier New", monospace;">Pictures</h2></a>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style="margin-right:12px;">
        <li class="nav-item">
          <div id="loginButton" class="flex-container">
            <div class="g-signin2" data-onsuccess="onSignIn" style="padding-right:10px"></div>
            <fb:login-button scope="public_profile,email" onlogin="checkLoginState();" data-use-continue-as="true" data-size="medium">
            </fb:login-button>
          </div>
          <div id="userbar" style="display: none; flex-direction: row;">
            <a href="profile.html" class="nohoverlink"><h2 id="loginNameText" style="color:white;">N/A</h2></a>
            <a href="profile.html" class="nohoverlink"><img src="" alt="User icon" width="50" height="50" style="border-radius: 50%;" id="loginUserIcon"></a>
          </div
        </li>
      </ul>
    </div>
  </div>
</nav>
<!--Page header end-->`



//inject headers
FooterContainer.innerHTML = FooterCode
HeaderContainer.innerHTML = HeaderCode

//inject css
document.head.innerHTML += `<link rel="stylesheet" href="css/navbar.css">`
document.head.innerHTML += `<link rel="stylesheet" href="css/footer.css">`