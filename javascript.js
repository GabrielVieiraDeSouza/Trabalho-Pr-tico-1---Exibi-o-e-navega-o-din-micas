const ContainerGames = document.getElementById("CorpoCardsContainerCards").children[0].children;


for (let i = 0; i < ContainerGames.length; i++) {
    ContainerGames[i].querySelector(".BotatoRedirecionar").addEventListener("click", () => {
           event.preventDefault()
           const JogoId = (ContainerGames[i].children[0].id);
           MetaURL(0)
    })
}

async function MetaURL(JogoID) {
    const DB = await PuxarDados()
    const JogoEscolhido = DB[0][JogoID]
    window.location.href = JogoEscolhido.Meta
}

async function PuxarDados(ID) {
    const resultado = await fetch("http://localhost:3000/Midia")
    const DB = (await resultado).json()
    return DB

}