showadminitems();

function showadminitems() {
  if (token == '' || tokentype == '') {
    setTimeout(() => {
      showadminitems();
    }, 500);
    return;
  }
  if (userdata.Edit == "true")
    document.getElementById("edittools").style.display = "block";
  if (userdata.AccountControl == "true")
    document.getElementById("accounttools").style.display = "block";
}