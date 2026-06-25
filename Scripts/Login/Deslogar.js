let Deslogar = document.getElementById("DeslogarUsuario")

function DeslogarUsuarioLogado() {
    sessionStorage.removeItem("login")
    sessionStorage.removeItem("Admin")
    window.location.href = "/public/Login's/Login.html"
}

Deslogar.addEventListener("click", () => {
    DeslogarUsuarioLogado()
})