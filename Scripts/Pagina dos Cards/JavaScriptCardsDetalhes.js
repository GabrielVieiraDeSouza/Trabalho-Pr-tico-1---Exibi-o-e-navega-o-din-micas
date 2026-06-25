const ContainerSemelhantes = document.getElementById("ContainerSemelhantes")
const TemplateCardSemelhante = document.getElementById("TemplateSemelhante")
let Logado = sessionStorage.getItem("login")

function PuxarDados() {
    let DB = localStorage.getItem("Midia")
    return DB ? JSON.parse(DB) : []
}


function FormatarTexto(Texto) {
    return (Texto || "").split("<>").join("<br>")
}

function MetaURL(JogoID) {
    window.location.href = "/public/PaginaDeDetalhes/PaginaDetalhes.html" + '?id=' + JogoID
}

function CarregarSemelhantes(JogoID) {
    let DB = PuxarDados()
    let JogoSemelhante = DB[JogoID]
    if (!JogoSemelhante) return

    let Copia = TemplateCardSemelhante.content.cloneNode(true)
    Copia.querySelector("#ImagemSemelhante").src = JogoSemelhante.LogoCard
    Copia.querySelector("#TituloSemelhante").textContent = JogoSemelhante.Nome
    Copia.querySelector("#EstudioSemelhante").textContent = JogoSemelhante.Estudio
    Copia.querySelector(".CartaMedia").id = JogoID
    Copia.querySelector(".CardsJogos").classList.remove("invisible")

    Copia.querySelector(".BotatoRedirecionar").addEventListener("click", (event) => {
        event.preventDefault()
        MetaURL(JogoID)
    })

    ContainerSemelhantes.appendChild(Copia)
}

function RenderizarPagina(DB, JogoID) {
    const InfoJogo = DB[JogoID]
    if (!InfoJogo) return

    document.getElementById("TituloJogo").textContent = InfoJogo.Nome
    document.getElementById("Sinopse").innerHTML = FormatarTexto(InfoJogo.DicionarioDescricoes.Sinopse)
    document.getElementById("DescricaoJogo").innerHTML = FormatarTexto(InfoJogo.DicionarioDescricoes.Descricao_Do_Jogo)
    document.getElementById("HistoriaDoEstudioTexto").innerHTML = FormatarTexto(InfoJogo.DicionarioDescricoes.Historia_Do_Estudio)
    document.getElementById("TrailerJogo").src = InfoJogo.DicionarioDescricoes.TrailerJogo
    document.getElementById("LogoJogo").src = InfoJogo.LogoCard
}

window.onload = () => {
    const SearchParams = new URLSearchParams(window.location.search)
    const JogoID = SearchParams.get("id")
    const DB = PuxarDados()

    RenderizarPagina(DB, JogoID)

    let Semelhantes = (DB[JogoID] && DB[JogoID].Semelhantes) || []
    Semelhantes.forEach((Indice) => {
        CarregarSemelhantes(Indice)
    })
    ValidarLogin()
}

function DeslogarUsuarioLogado() {
    sessionStorage.removeItem("login")
    sessionStorage.removeItem("Admin")
    window.location.href = "/public/Login's/Login.html"
}
function ValidarLogin() {
    const ContainerCabecalho = document.getElementById("BotõesCabeçalho");
    ContainerCabecalho.innerHTML = "";

    const Logado = sessionStorage.getItem("login");
    const EhAdmin = sessionStorage.getItem("Admin") === "true";

    const TemplateBotoes = document.getElementById("TemplateBotõesCabeçalho").content;

    const BotaoLogin = TemplateBotoes
        .getElementById("TemplateBotãoCabeçalhoLogin")
        .cloneNode(true);

    const BotaoLogout = TemplateBotoes
        .getElementById("TemplateBotãoCabeçalhoLogout")
        .cloneNode(true);

    const BotaoFavoritos = TemplateBotoes
        .getElementById("TemplateBotãoCabeçalhoFavoritos")
        .cloneNode(true);

    const BotaoModificar = TemplateBotoes
        .getElementById("TemplateModificarItens")
        .cloneNode(true);


    if (!Logado) {
        ContainerCabecalho.appendChild(BotaoLogin);

        BotaoLogin.addEventListener("click", () => {
            window.location.href = "/public/Login's/Login.html";
        });

        return;
    }

    ContainerCabecalho.appendChild(BotaoFavoritos);
    ContainerCabecalho.appendChild(BotaoLogout);

    BotaoFavoritos.addEventListener("click", () => {
        window.location.href = "/public/Favoritos/Favoritos.html";
    });

    BotaoLogout.addEventListener("click", () => {
        DeslogarUsuarioLogado();
    });


    if (EhAdmin) {
        ContainerCabecalho.appendChild(BotaoModificar);

        BotaoModificar.addEventListener("click", () => {
            window.location.href = "/public/CRUD/CRUD.html";
        });
    }

    console.log("Logado:", Logado);
    console.log("Admin:", EhAdmin);
}