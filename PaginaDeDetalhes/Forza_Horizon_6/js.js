

const ContainerSemelhantes = document.getElementById("ContainerSemelhantes")
const TemplateCardSemelhante = document.getElementById("TemplateSemelhante")

async function MetaURL(JogoID) {
    const DB = await PuxarDados()
    console.log(JogoID)
    const JogoEscolhido = DB[0][JogoID]
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
    console.log(DB[0][JogoID])
    Copia.querySelector("#ImagemSemelhante").src = (DB[0][JogoID].LogoCard)
    Copia.querySelector("#TituloSemelhante").textContent = DB[0][JogoID].Nome
    Copia.querySelector("#EstudioSemelhante").textContent = DB[0][JogoID].Estudio
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
    console.log(DB[0][JogoID]["Semelhantes"],DB[0][JogoID])

    DB[0][JogoID]["Semelhantes"].forEach((element) => {
        CarregarSemelhantes(element)
    })
    
    
    
    
    
    
    
    
    
    
}