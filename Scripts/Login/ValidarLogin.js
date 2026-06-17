
window.addEventListener("load", () => {
    ValidarLogin();
})

function ValidarLogin() {
    let DB = PuxarDadosUsuarios()
    console.log(typeof (DB))
    for (const [key, value] of Object.entries(DB)) {
        console.log(`${key}: ${value}`);
    }
}

async function PuxarDadosUsuarios() {
    let resultado = await fetch("http://localhost:3000/Usuarios")
    let DB = (await resultado).json()
    return DB
}