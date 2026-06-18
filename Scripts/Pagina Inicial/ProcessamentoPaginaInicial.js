const CorpoCardsContainerCards = document.getElementById("CorpoCardsContainerCards");
const TemplateCard = document.getElementById("TemplateCard");
let Logado = sessionStorage.getItem("login")

document.addEventListener("DOMContentLoaded", () => {
    sessionStorage.removeItem("cadastrado")
    CarregarCardsInicias();
    ValidarLogin()
    const container = document.getElementById("CorpoCardsContainerCards");
    if (!container) return;
});
 
async function MetaURL(JogoID) {
    let DB = await PuxarDados();
    const JogoEscolhido = DB[JogoID];
    window.location.href = "/PaginaDeDetalhes/PaginaDetalhes.html" + '?id=' + JogoID;
}
 
async function PuxarDados() {
    let resultado = await fetch("http://localhost:3000/Midia");
    let DB = await resultado.json();
    return DB;
}

async function CriarCard(BancoDeDados, JogoID) {
    let Copia = TemplateCard.content.cloneNode(true);
    Copia.querySelector(".card-title").textContent = BancoDeDados.Nome;
    Copia.querySelector(".CartaMedia").id = JogoID;
    Copia.querySelector(".card-subtitle").textContent = BancoDeDados.Estudio;
    console.log(JogoID,BancoDeDados)
    Copia.querySelector(".card-text").textContent = BancoDeDados.DicionarioDescricoes.HomePage
    Copia.querySelector(".card-img-top").src = BancoDeDados.LogoCard;
    Copia.querySelector(".BotatoRedirecionar").addEventListener("click" , () => {
        event.preventDefault();
        MetaURL(JogoID)
    })
    CorpoCardsContainerCards.appendChild(Copia);
    
}

async function CarregarCardsInicias() {
    let  DB = await PuxarDados();
    for (let i = 0; i < DB.length; i++) {
        CriarCard(DB[i], i);
    }
}





//PARTE De Validação de  LOGIN
function ValidarLogin(){
    console.log("1")
    let TemplateCabecalhoBotaoLogin = document.getElementById("TemplateBotõesCabeçalho").content.getElementById("TemplateBotãoCabeçalhoLogin").cloneNode(true)
    let TemplateCabecalhoBotaoDeslogar = document.getElementById("TemplateBotõesCabeçalho").content.getElementById("TemplateBotãoCabeçalhoLogout").cloneNode(true)
    let TemplateCabecalhoBotaoFavoritos = document.getElementById("TemplateBotõesCabeçalho").content.getElementById("TemplateBotãoCabeçalhoFavoritos").cloneNode(true)
    let ContainerCabecalho = document.getElementById("BotõesCabeçalho")
    if (Logado){
        ContainerCabecalho.appendChild(TemplateCabecalhoBotaoFavoritos)
        ContainerCabecalho.appendChild(TemplateCabecalhoBotaoDeslogar)
        TemplateCabecalhoBotaoDeslogar.addEventListener("click", () =>{
            DeslogarUsuarioLogado()
        })
        TemplateCabecalhoBotaoFavoritos.addEventListener("click", (event) => {
            window.location.href = "/Favoritos/Favoritos.html"
        })
    } else {
        ContainerCabecalho.appendChild(TemplateCabecalhoBotaoLogin)
        TemplateCabecalhoBotaoLogin.addEventListener("click", () => {
            window.location.href = "http://127.0.0.1:5500/Login's/Login.html"
        })
    }
}


function DeslogarUsuarioLogado(){
    sessionStorage.removeItem("login")
    window.location.href = "http://127.0.0.1:5500/Login's/Login.html"
}