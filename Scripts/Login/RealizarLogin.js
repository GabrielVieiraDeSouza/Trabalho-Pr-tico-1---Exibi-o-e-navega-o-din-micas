const Logar = document.getElementById("LogarBotao")

async function RealizarLogin(){
    event.preventDefault()
    const DB = await PuxarDadosUsuarios()
    let Usuario = document.getElementById("UsuarioCampo").value
    let Senha = document.getElementById("SenhaCampo").value
    for (let i = 0; i < Object.keys(DB).length; i++){
        console.log(DB[i])
    }
}

async function PuxarDadosUsuarios() {
    const resultado = await fetch("http://localhost:3000/Usuarios")
    const DB = (await resultado).json()
    return DB
}


Logar.addEventListener("click", () => {
    RealizarLogin()
})