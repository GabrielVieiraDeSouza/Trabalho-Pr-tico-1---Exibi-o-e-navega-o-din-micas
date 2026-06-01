const CorpoCardsContainerCards = document.getElementById("CorpoCardsContainerCards");
const TemplateCard = document.getElementById("TemplateCard");

document.addEventListener("DOMContentLoaded", () => {
    CarregarCardsInicias();
    const container = document.getElementById("CorpoCardsContainerCards");
    if (!container) return;

});
 
async function MetaURL(JogoID) {
    const DB = await PuxarDados();
    const JogoEscolhido = DB[JogoID];
    window.location.href = "/PaginaDeDetalhes/Template.html?ID="+ JogoID
}
 
async function PuxarDados() {
    const resultado = await fetch("http://localhost:3000/Midia");
    const DB = await resultado.json();
    return DB;
}

async function CriarCard(BancoDeDados, JogoID) {
    let Copia = TemplateCard.content.cloneNode(true);
    console.log(Copia)
    Copia.querySelector(".card-title").textContent = BancoDeDados.Nome;
    Copia.querySelector(".CartaMedia").id = JogoID;
    Copia.querySelector(".card-subtitle").textContent = BancoDeDados.Estudio;
    Copia.querySelector(".card-text").textContent = BancoDeDados.DicionarioDescricoes["HomePage"]
    Copia.querySelector(".card-img-top").src = BancoDeDados.LogoCard;
    Copia.querySelector(".BotatoRedirecionar").addEventListener("click" , () => {
        event.preventDefault();
        MetaURL(JogoID)
    })
    CorpoCardsContainerCards.appendChild(Copia);
    
}


async function CarregarCardsInicias() {
    const DB = await PuxarDados();
    for (let i = 0; i < DB.length; i++) {
        CriarCard(DB[i], i);
    }
}