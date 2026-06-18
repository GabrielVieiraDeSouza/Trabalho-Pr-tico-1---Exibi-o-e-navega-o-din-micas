
window.addEventListener("load", () => {
    ValidarLogin();
})

function ValidarLogin() {
    let Usuario = sessionStorage.getItem("login")
    if (!Usuario){
        window.location.href = "http://127.0.0.1:5500/Login's/Login.html?"
    } 
}
