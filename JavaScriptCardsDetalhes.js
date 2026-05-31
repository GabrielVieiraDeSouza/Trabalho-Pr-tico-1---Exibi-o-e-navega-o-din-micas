

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
    console.log(ContainerSemelhantes)
    Copia.querySelector(".BotatoRedirecionar").addEventListener("click", () => {
        event.preventDefault()
        console.log("Apertado")
        MetaURL(JogoID)
    })
    ContainerSemelhantes.appendChild(Copia)
    
}

window.onload = async () => { 
    const SearchParams = new URLSearchParams(window.location.search)
    const JogoID = SearchParams.get("id")
    const DB = await PuxarDados()
    let Cont = 0;

    DB[JogoID]["Semelhantes"].forEach((element) => {
        CarregarSemelhantes(element)
    })

    
    
    
    
}