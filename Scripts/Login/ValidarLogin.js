
window.addEventListener("load", () => {
    ValidarLogin();
})

function ValidarLogin() {
    let Usuario = sessionStorage.getItem("login")
    if (!Usuario){
        window.location.href = "/public/Login's/Login.html?"
    } 
}
