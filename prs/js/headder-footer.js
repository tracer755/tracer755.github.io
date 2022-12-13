const FooterIdName = "sitefooter"
const HeaderIdName = "SiteHeader"



//inject divs
document.body.innerHTML = `<div id="SiteHeader"></div>` + document.body.innerHTML
document.body.innerHTML += `<div id="sitefooter"></div>`


let FooterContainer = document.getElementById(FooterIdName)
let HeaderContainer = document.getElementById(HeaderIdName)

const FooterCode = `
`

const HeaderCode = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="/prs/">Prs Pics</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        <li class="nav-item">
            <a class="nav-link" href="/prs/">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="random.html">Random</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="submit.html">Submit</a>
        </li>
        </ul>
    </div>
</nav>
`



//inject headers
FooterContainer.innerHTML = FooterCode
HeaderContainer.innerHTML = HeaderCode

//inject css
document.head.innerHTML += `<link rel="stylesheet" href="css/navbar.css">`
document.head.innerHTML += `<link rel="stylesheet" href="css/footer.css">`