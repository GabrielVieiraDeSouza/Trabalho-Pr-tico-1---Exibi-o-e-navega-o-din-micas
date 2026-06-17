

const ContainerSemelhantes = document.getElementById("ContainerSemelhantes")
const TemplateCardSemelhante = document.getElementById("TemplateSemelhante")

async function MetaURL(JogoID) {
    const DB = await PuxarDados()
    console.log(JogoID)
    const JogoEscolhido = DB[JogoID]
    let URL = new URLSearchParams(JogoEscolhido.Meta)
    window.location.href = JogoEscolhido.Meta + '?id=' + JogoID
}

async function PuxarDados() {
    let resultado = await fetch("http://localhost:3000/Midia")
    let DB = (await resultado).json()
    return DB
}

async function CarregarSemelhantes(JogoID) {
    let DB = await PuxarDados()
    let Copia = TemplateCardSemelhante.content.cloneNode(true)
    Copia.querySelector("#ImagemSemelhante").src = (DB[JogoID].LogoCard)
    Copia.querySelector("#TituloSemelhante").textContent = DB[JogoID].Nome
    Copia.querySelector("#EstudioSemelhante").textContent = DB[JogoID].Estudio
    Copia.querySelector(".CartaMedia").id = JogoID
    Copia.querySelector(".CardsJogos").classList.remove("invisible")
    console.log(ContainerSemelhantes)
    Copia.querySelector(".BotatoRedirecionar").addEventListener("click", () => {
        event.preventDefault()
        console.log("Apertado")
        MetaURL(JogoID)
    })
    ContainerSemelhantes.appendChild(Copia)
    
}

function RenderizarPagina(DB,JogoID){
    const InfoJogo = DB[JogoID]
    const TituloJogo = InfoJogo.Nome
    const Sinopse = InfoJogo.DicionarioDescricoes.Sinopse
    const DescricaoJogo = InfoJogo.DicionarioDescricoes.Descricao_Do_Jogo
    const HistoriaEstudio = InfoJogo.DicionarioDescricoes.Historia_Do_Estudio
    const LogoJogo = InfoJogo.LogoCard
    const LinkTrailer = InfoJogo.DicionarioDescricoes.TrailerJogo
    document.getElementById("TituloJogo").innerHTML = InfoJogo.Nome
    document.getElementById("Sinopse").innerHTML = Sinopse
    document.getElementById("DescricaoJogo").innerHTML = DescricaoJogo
    document.getElementById("HistoriaDoEstudioTexto").innerHTML = HistoriaEstudio
    document.getElementById("TrailerJogo").src = LinkTrailer
    document.getElementById("LogoJogo").src = InfoJogo.LogoCard
    console.log(DescricaoJogo)
}


window.onload = async () => {
    const SearchParams = new URLSearchParams(window.location.search)
    const JogoID = SearchParams.get("id")
    const DB = await PuxarDados()
    let Cont = 0;
    RenderizarPagina(DB,JogoID)
    DB[JogoID]["Semelhantes"].forEach((element) => {
        CarregarSemelhantes(element)
    })
}