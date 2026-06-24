let ContainerCards  =  document.getElementById("CorpoCardsContainerCards")
document.addEventListener("DOMContentLoaded", () => {
    CarregarItemPesquisado()
});

function MetaURL(JogoID) {
    window.location.href = "/PaginaDeDetalhes/PaginaDetalhes.html" + '?id=' + JogoID;
}

function PuxarDados() {
    let DB = localStorage.getItem("Midia")
    return DB ? JSON.parse(DB) : []
}

function PuxarDadosUsuarios() {
    let DB = localStorage.getItem("Usuarios")
    return DB ? JSON.parse(DB) : []
}

function BuscarUsuarioLogado() {
    let LoginAtual = sessionStorage.getItem("login")
    if (!LoginAtual) return null
    return PuxarDadosUsuarios().find(Usuario => Usuario.Login == LoginAtual) || null
}

function EhFavorito(JogoID) {
    let Usuario = BuscarUsuarioLogado()
    if (!Usuario) return false
    return Usuario.Favoritos.some(id => String(id) === String(JogoID))
}

function AlternarFavorito(JogoID) {
    let LoginAtual = sessionStorage.getItem("login")
    if (!LoginAtual) return null

    let DB = PuxarDadosUsuarios()
    let Usuario = DB.find(u => u.Login == LoginAtual)
    if (!Usuario) return null

    let JaEhFavorito = Usuario.Favoritos.some(id => String(id) === String(JogoID))

    if (JaEhFavorito) {
        Usuario.Favoritos = Usuario.Favoritos.filter(id => String(id) !== String(JogoID))
    } else {
        Usuario.Favoritos.push(JogoID)
    }

    SalvarDadosUsuarios(DB)
    return !JaEhFavorito
}

function DeslogarUsuarioLogado() {
    sessionStorage.removeItem("login")
    sessionStorage.removeItem("Admin")
    window.location.href = "http://127.0.0.1:5500/Login's/Login.html"
}

function SalvarDadosUsuarios(DB) {
    localStorage.setItem("Usuarios", JSON.stringify(DB))
}

function CarregarItemPesquisado() {
    let count = false
    let JogoPesquisado = PegarPesquisa()
    let Midia = JSON.parse(localStorage.getItem("Midia"))
    console.log(Midia)
    Midia.forEach(element => {
        let NomeJogo = element.Nome.toLowerCase()
        if (NomeJogo.includes(JogoPesquisado)){
            console.log("Jogo inclui",element.Nome)
            CriarCard(element.id,element)
            count = true
        }
    });
    if (!count) {
        document.getElementById("Resultado").textContent = "Não foi encontrado nenhum resultado"
    }
}

function PegarPesquisa(){
    let Pesquisa = new URLSearchParams(window.location.search);
    let Jogo = Pesquisa.get("Jogo")
    return Jogo.toLowerCase()
}

function CriarCard(id,BancoDeDados){
    let Copia =  document.getElementById("TemplateCard").content.cloneNode(true)
    Copia.querySelector(".card-title").textContent = BancoDeDados.Nome;
    Copia.querySelector(".CartaMedia").id = id;
    Copia.querySelector(".card-subtitle").textContent = BancoDeDados.Estudio;
    Copia.querySelector(".card-text").textContent = BancoDeDados.DicionarioDescricoes.HomePage
    Copia.querySelector(".card-img-top").src = BancoDeDados.LogoCard;

    Copia.querySelector(".BotatoRedirecionar").addEventListener("click", (event) => {
        event.preventDefault();
        MetaURL(id)
    })

    let BotaoFavoritar = Copia.querySelector(".Favoritar")
    console.log(BancoDeDados.id)
    BotaoFavoritar.textContent = EhFavorito(BancoDeDados.id) ? "⭐" : "☆"
    BotaoFavoritar.addEventListener("click", (event) => {
        event.preventDefault();

        if (!sessionStorage.getItem("login")) {
            window.location.href = "http://127.0.0.1:5500/Login's/Login.html"
            return
        }

        let Ativo = AlternarFavorito(id)
        BotaoFavoritar.textContent = Ativo ? "⭐" : "☆"
    })

    ContainerCards.appendChild(Copia)
}


document.getElementById("Inicio").addEventListener("click",() =>{
    window.location.href =  "/"
})