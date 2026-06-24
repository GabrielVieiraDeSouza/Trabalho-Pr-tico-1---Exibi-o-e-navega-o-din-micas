let Deslogar = document.getElementById("DeslogarUsuario")

function DeslogarUsuarioLogado() {
    sessionStorage.removeItem("login")
    sessionStorage.removeItem("Admin")
    window.location.href = "http://127.0.0.1:5500/public/Login's/Login.html"
}

Deslogar.addEventListener("click", () => {
    DeslogarUsuarioLogado()
})