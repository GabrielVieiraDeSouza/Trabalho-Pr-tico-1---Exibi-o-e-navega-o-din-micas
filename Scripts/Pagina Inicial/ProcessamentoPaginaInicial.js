// Garante itens de exemplo no LocalStorage até a tela de cadastro (CRUD) existir.
// Pode apagar essa função quando o cadastro de itens estiver pronto.
function InicializarMidia() {
    if (!localStorage.getItem("Midia")) {
        let MidiaPadrao = [
            {
                Nome: "Metal Gear V: The Phantom Pain",
                Estudio: "Kojima Productions",
                LogoCard: "/Images/Metal_Gear_V/Metal_Gear_V.jpeg",
                DicionarioDescricoes: { HomePage: "Um rápido texto introdutorio do jogo." }
            },
            {
                Nome: "Forza Horizon 6",
                Estudio: "Playground Games",
                LogoCard: "/Images/ForzaHorizon6/Forza6.jpeg",
                DicionarioDescricoes: { HomePage: "Um rápido texto introdutorio do jogo." }
            },
            {
                Nome: "Lego Batman: Legacy of The Dark Knight",
                Estudio: "TT Games",
                LogoCard: "/Images/LegoBatmanLODK/LegoBatmanLODK.jpeg",
                DicionarioDescricoes: { HomePage: "Um rápido texto introdutorio do jogo." }
            },
            {
                Nome: "Death Stranding 2",
                Estudio: "Kojima Productions",
                LogoCard: "/Images/DeathStranding2/DeathStranding2.jpeg",
                DicionarioDescricoes: { HomePage: "Um rápido texto introdutorio do jogo." }
            }
        ]
        localStorage.setItem("Midia", JSON.stringify(MidiaPadrao))
    }
}

function DeslogarUsuarioLogado() {
    sessionStorage.removeItem("login")
    sessionStorage.removeItem("Admin")
    window.location.href = "http://127.0.0.1:5500/Login's/Login.html"
}

const CorpoCardsContainerCards = document.getElementById("CorpoCardsContainerCards");
const TemplateCard = document.getElementById("TemplateCard");
let Logado = sessionStorage.getItem("login")

document.addEventListener("DOMContentLoaded", () => {
    sessionStorage.removeItem("cadastrado")
    InicializarMidia()
    CarregarCardsInicias();
    ValidarLogin()
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

function SalvarDadosUsuarios(DB) {
    localStorage.setItem("Usuarios", JSON.stringify(DB))
}

// Procura, no LocalStorage, o registro completo do usuário logado
// (o sessionStorage só guarda o "login" como identificador da sessão).
function BuscarUsuarioLogado() {
    let LoginAtual = sessionStorage.getItem("login")
    if (!LoginAtual) return null
    return PuxarDadosUsuarios().find(Usuario => Usuario.Login == LoginAtual) || null
}

function EhFavorito(JogoID) {
    let Usuario = BuscarUsuarioLogado()
    if (!Usuario) return false
    return Usuario.Favoritos.includes(JogoID)
}

function AlternarFavorito(JogoID) {
    let LoginAtual = sessionStorage.getItem("login")
    if (!LoginAtual) return null

    let DB = PuxarDadosUsuarios()
    let Usuario = DB.find(u => u.Login == LoginAtual)
    if (!Usuario) return null

    if (Usuario.Favoritos.includes(JogoID)) {
        Usuario.Favoritos = Usuario.Favoritos.filter(id => id != JogoID)
    } else {
        Usuario.Favoritos.push(JogoID)
    }

    SalvarDadosUsuarios(DB)
    return Usuario.Favoritos.includes(JogoID)
}

function CriarCard(BancoDeDados, JogoID) {
    let Copia = TemplateCard.content.cloneNode(true);
    Copia.querySelector(".card-title").textContent = BancoDeDados.Nome;
    Copia.querySelector(".CartaMedia").id = JogoID;
    Copia.querySelector(".card-subtitle").textContent = BancoDeDados.Estudio;
    Copia.querySelector(".card-text").textContent = BancoDeDados.DicionarioDescricoes.HomePage
    Copia.querySelector(".card-img-top").src = BancoDeDados.LogoCard;

    Copia.querySelector(".BotatoRedirecionar").addEventListener("click", (event) => {
        event.preventDefault();
        MetaURL(JogoID)
    })

    let BotaoFavoritar = Copia.querySelector(".Favoritar")
    BotaoFavoritar.textContent = EhFavorito(JogoID) ? "⭐" : "☆"
    BotaoFavoritar.addEventListener("click", (event) => {
        event.preventDefault();

        if (!sessionStorage.getItem("login")) {
            window.location.href = "http://127.0.0.1:5500/Login's/Login.html"
            return
        }

        let Ativo = AlternarFavorito(JogoID)
        BotaoFavoritar.textContent = Ativo ? "⭐" : "☆"
    })

    CorpoCardsContainerCards.appendChild(Copia);
}

function CarregarCardsInicias() {
    let DB = PuxarDados();
    for (let i = 0; i < DB.length; i++) {
        CriarCard(DB[i], i);
    }
}

// PARTE DE VALIDAÇÃO DE LOGIN (cabeçalho)
function ValidarLogin() {
    let TemplateCabecalhoBotaoLogin = document.getElementById("TemplateBotõesCabeçalho").content.getElementById("TemplateBotãoCabeçalhoLogin").cloneNode(true)
    let TemplateCabecalhoBotaoDeslogar = document.getElementById("TemplateBotõesCabeçalho").content.getElementById("TemplateBotãoCabeçalhoLogout").cloneNode(true)
    let TemplateCabecalhoBotaoFavoritos = document.getElementById("TemplateBotõesCabeçalho").content.getElementById("TemplateBotãoCabeçalhoFavoritos").cloneNode(true)
    let ContainerCabecalho = document.getElementById("BotõesCabeçalho")

    if (Logado) {
        ContainerCabecalho.appendChild(TemplateCabecalhoBotaoFavoritos)
        ContainerCabecalho.appendChild(TemplateCabecalhoBotaoDeslogar)
        TemplateCabecalhoBotaoDeslogar.addEventListener("click", () => {
            DeslogarUsuarioLogado()
        })
        TemplateCabecalhoBotaoFavoritos.addEventListener("click", () => {
            window.location.href = "/Favoritos/Favoritos.html"
        })
    } else {
        ContainerCabecalho.appendChild(TemplateCabecalhoBotaoLogin)
        TemplateCabecalhoBotaoLogin.addEventListener("click", () => {
            window.location.href = "http://127.0.0.1:5500/Login's/Login.html"
        })
    }
}