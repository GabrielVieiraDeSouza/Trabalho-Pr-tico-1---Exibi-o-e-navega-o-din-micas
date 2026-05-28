document.addEventListener("DOMContentLoaded", () => {
 
    const container = document.getElementById("CorpoCardsContainerCards");
    if (!container) return;
 
    const ContainerGames = container.children[0].children;
 
    for (let i = 0; i < ContainerGames.length; i++) {
        const btn = ContainerGames[i].querySelector(".BotatoRedirecionar");
        if (!btn) continue;
 
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            const JogoId = ContainerGames[i].children[0].id;
            MetaURL(JogoId);
        });
    }
});
 
async function MetaURL(JogoID) {
    const DB = await PuxarDados();
    const JogoEscolhido = DB[0][JogoID];
    window.location.href = JogoEscolhido.Meta + '?id=' + JogoID;
}
 
async function PuxarDados() {
    const resultado = await fetch("http://localhost:3000/Midia");
    const DB = await resultado.json();
    return DB;
}

document.addEventListener("DOMContentLoaded", function() {
    const next = document.querySelector('.carousel-control-next');
    const prev = document.querySelector('.carousel-control-prev');
    
    if (next) {
        next.setAttribute('style', 'display:flex!important;position:absolute;right:0;top:0;bottom:0;width:60px;z-index:9999;opacity:1;background:rgba(0,0,0,0.3);align-items:center;justify-content:center;border:none;');
    }
    if (prev) {
        prev.setAttribute('style', 'display:flex!important;position:absolute;left:0;top:0;bottom:0;width:60px;z-index:9999;opacity:1;background:rgba(0,0,0,0.3);align-items:center;justify-content:center;border:none;');
    }
});