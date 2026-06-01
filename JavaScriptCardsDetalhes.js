let ContainerSemelhantes = document.getElementById("ContainerSemelhantesJogos")
let TemplateCardSemelhante = document.getElementById("TemplateSemelhante")

async function RedirecionarPaginaPorMetaURL(JogoID) {
    const DB = await PuxarDados()
    const JogoEscolhido = DB[JogoID]
    let URL = new URLSearchParams(JogoEscolhido.Meta)
    window.location.href = "/PaginaDeDetalhes/Template.html?ID="+ JogoID
}

async function PuxarDados() {
    const resultado = await fetch("http://localhost:3000/Midia")
    const DB = (await resultado).json()
    return DB
}

async function CarregarSemelhantes(JogoID) {
    const DB = await PuxarDados()
    const Copia = TemplateCardSemelhante.content.cloneNode(true)
    Copia.querySelector("#ImagemSemelhante").src = (DB[JogoID].LogoCard)
    Copia.querySelector("#TituloSemelhante").textContent = DB[JogoID].Nome
    Copia.querySelector("#EstudioSemelhante").textContent = DB[JogoID].Estudio
    Copia.querySelector(".CartaMedia").id = JogoID
    Copia.querySelector(".CardsJogos").classList.remove("invisible")
    Copia.querySelector(".BotatoRedirecionar").addEventListener("click", () => {
        RedirecionarPaginaPorMetaURL(JogoID)
    })
    
    ContainerSemelhantes.appendChild(Copia)
    
    
}

async function CarregarPagina() {
    const SearchParams = new URLSearchParams(window.location.search)
    const JogoID = SearchParams.get("ID")
    const DB = await PuxarDados()
    document.getElementById("Titulo").textContent = DB[JogoID].Nome
    document.getElementById("ImagemPrincipal").src = DB[JogoID].LogoCard
    document.getElementById("Descricao").textContent = DB[JogoID].DicionarioDescricoes["HomePage"]
}

window.addEventListener("load", async () => {
    const SearchParams = new URLSearchParams(window.location.search)
    const JogoID = SearchParams.get("ID")
    const DB = await PuxarDados()
    console.log(DB[2].Semelhantes,JogoID)
    DB[JogoID]["Semelhantes"].forEach((element) => {
        CarregarSemelhantes(element)
    })
})