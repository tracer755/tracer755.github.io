CheckAdminPerms();

function CheckAdminPerms() {
  if (token == "" || tokentype == '') {
    setTimeout(() => {
      CheckAdminPerms();
    }, 200);
    return;
  }
  let permlatch = false;
  if (userdata.Edit == "true") {
    permlatch = true;
  }
  if (userdata.AccountControl == "true") {
    permlatch = true;
  }
  if (permlatch) {
    document.getElementById("admintool").style.display = "block";
  }
}