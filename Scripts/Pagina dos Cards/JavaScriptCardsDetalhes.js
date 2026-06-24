const ContainerSemelhantes = document.getElementById("ContainerSemelhantes")
const TemplateCardSemelhante = document.getElementById("TemplateSemelhante")

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
}

document.getElementById("Inicio").addEventListener("click",() =>{
    window.location.href =  "/"
})