let CadastroAberto = true

function LogarUsuario(Login) {
    sessionStorage.setItem("login", Login)
    sessionStorage.removeItem("cadastrado")
    window.location.href = "http://127.0.0.1:5500/index.html"
}

async function RealizarLogin() {
    event.preventDefault()
    const DB = await PuxarDadosUsuarios()
    let Usuario = document.getElementById("UsuarioCampo").value
    let Senha = document.getElementById("SenhaCampo").value
    for (let i = 0; i < Object.keys(DB).length; i++) {
        if (DB[i].Login == Usuario && DB[i].Senha == Senha) {
            sessionStorage.removeItem("cadastrado")  // Limpa ao logar
            LogarUsuario(Usuario)
            return
        }
    }
    MensagemLoginErrado()
}

async function PuxarDadosUsuarios() {
    let resultado = await fetch("http://localhost:3000/Usuarios")
    let DB = await resultado.json()
    return DB
}

async function CadastrarUsuario() {
    event.preventDefault()
    let Usuario = document.getElementById("UsuarioCampo").value
    let Senha = document.getElementById("SenhaCampo").value
    let Nome = document.getElementById("NomeCampo").value
    let Email = document.getElementById("EmailCampo").value
    let resultado = await fetch("http://localhost:3000/Usuarios")
    let DB = await resultado.json()
    let UsuarioExiste = false

    if (Usuario == "" || Senha == "") {
        MensagemLoginErrado()
        return
    }

    for (let i = 0; i <= Object.keys(DB).length - 1; i++) {
        if (DB[i].Login == Usuario) {
            UsuarioExiste = true
        }
    }

    if (UsuarioExiste) {
        MensagemUsuarioCadastrado()
        return
    }

    let DadosUsuario = {
        "id": crypto.randomUUID(),
        "Login": Usuario,
        "Senha": Senha,
        "Nome": Nome,
        "Email": Email,
        "Favoritos": [],
        "Admin": false
    }

    await fetch("http://localhost:3000/Usuarios", {
        "method": "POST",
        "headers": { "Content-Type": "application/json" },
        "body": JSON.stringify(DadosUsuario)
    })

    sessionStorage.setItem("cadastrado", "true")  // Persiste no sessionStorage
    CadastroAberto = true
    AbrirTelaCadastro()
}

function AbrirTelaCadastro() {
    let Cadastrado = sessionStorage.getItem("cadastrado") === "true"  // Lê do sessionStorage
    let MensagemSucesso = Cadastrado ? "Usuário cadastrado com sucesso! Agora faça o login." : ""

    if (CadastroAberto) {
        document.getElementById("ModalLogin").innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4 shadow">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <h1 class="fw-bold fs-2 mx-auto">Login</h1>
                </div>
                <div class="modal-body p-5 pt-0">
                    <form id="FormularioLogin">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control rounded-3"
                                placeholder="Usuário" id="UsuarioCampo" required>
                            <label for="UsuarioCampo">Usuário</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control rounded-3"
                                placeholder="Senha" id="SenhaCampo" required>
                            <label for="SenhaCampo">Senha</label>
                        </div>
                        <div id="Mensagem" class="text-center mb-3 ${Cadastrado ? 'text-success' : 'text-danger'}">
                            ${MensagemSucesso}
                        </div>
                        <button type="button"
                            class="w-100 mb-2 btn btn-lg rounded-3 btn-primary my-4"
                            id="LogarBotao">Login</button>
                        <button type="button"
                            class="w-100 mb-2 btn btn-lg rounded-3 btn-secondary bg-primary"
                            id="Cadastro">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>`

        CadastroAberto = false
        document.getElementById("Cadastro").addEventListener("click", () => {
            sessionStorage.removeItem("cadastrado")  // Limpa ao abrir cadastro novamente
            AbrirTelaCadastro()
        })
        document.getElementById("LogarBotao").addEventListener("click", () => {
            RealizarLogin()
        })

    } else {
        document.getElementById("ModalLogin").innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content rounded-4 shadow">
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <h1 class="fw-bold fs-2 text-center w-100">Cadastro</h1>
                </div>
                <div class="modal-body p-5 pt-0">
                    <form id="FormularioCadastro">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control rounded-3"
                                placeholder="Usuário" id="UsuarioCampo" required>
                            <label for="UsuarioCampo">Usuário</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control rounded-3"
                                placeholder="Senha" id="SenhaCampo" required>
                            <label for="SenhaCampo">Senha</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control rounded-3"
                                placeholder="Nome" id="NomeCampo" required>
                            <label for="NomeCampo">Nome</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control rounded-3"
                                placeholder="E-mail" id="EmailCampo" required>
                            <label for="EmailCampo">E-mail</label>
                        </div>
                        <div id="Mensagem" class="text-center text-danger mb-3"></div>
                        <button type="button"
                            class="w-100 btn btn-lg rounded-3 btn-primary"
                            id="CadastrarBotao">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>`

        CadastroAberto = true
        document.getElementById("CadastrarBotao").addEventListener("click", () => {
            CadastrarUsuario()
        })
    }
}

function MensagemUsuarioCadastrado() {
    document.getElementById("Mensagem").innerHTML = '<h3>Usuário já cadastrado!</h3>'
}

function MensagemLoginErrado() {
    document.getElementById("Mensagem").innerHTML = '<h3>Usuário ou senha informados estão errados!</h3>'
}

window.addEventListener("load", () => {
    AbrirTelaCadastro()
})