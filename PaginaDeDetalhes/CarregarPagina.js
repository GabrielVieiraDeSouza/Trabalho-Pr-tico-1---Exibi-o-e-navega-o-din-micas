

async function PaginaVisitada() {
    const SearchParams = new URLSearchParams(window.location.search)
    const JogoID = SearchParams.get("ID")
    const Vezes = localStorage.getItem("VezesVisitada"+JogoID)
    console.log(localStorage.getItem("VezesVisitada"+JogoID))
    if (!Vezes) {
        localStorage.setItem("VezesVisitada"+JogoID, 1)
    } else {
        localStorage.setItem("VezesVisitada"+JogoID, parseInt(Vezes) + 1)
    }
    document.getElementById("VezesVisitado").textContent = " "+localStorage.getItem("VezesVisitada"+JogoID)
}


async function CarregarConteudoDaPaginaTemplate() {
    const SearchParams = new URLSearchParams(window.location.search)
    const JogoID = SearchParams.get("ID")
    const DB = await PuxarDados()
    document.getElementById("TituloJogo").textContent = DB[JogoID].Nome
    document.getElementById("ImagemPrincipal").src = DB[JogoID].LogoCard
    document.getElementById("Sinopse").textContent = DB[JogoID].Descricao
    document.getElementById("DescricaoJogo").textContent = DB[JogoID].DicionarioDescricoes["HomePage"]
    document.getElementById("DescricaoEstudio").textContent = DB[JogoID].DicionarioDescricoes["DescricaoEstudio"]
    document.getElementById("Trailer").src = DB[JogoID].DicionarioDescricoes.Trailer
}

window.addEventListener("load", () => {
    PaginaVisitada()
    CarregarConteudoDaPaginaTemplate()
})
