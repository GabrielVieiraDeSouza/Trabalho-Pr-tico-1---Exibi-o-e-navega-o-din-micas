let Deslogar = document.getElementById("DeslogarUsuario")

function DeslogarUsuarioLogado(){
    sessionStorage.removeItem("login")
    window.location.href = "http://127.0.0.1:5500/Login's/Login.html"
}