let CadastroAberto = true

function InicializarUsuarios() {
    if (!localStorage.getItem("Usuarios")) {
        let UsuariosPadrao = [
            {
                "id": crypto.randomUUID(),
                "Login": "admin",
                "Senha": "123",
                "Nome": "Administrador do Sistema",
                "Email": "admin@abc.com",
                "Favoritos": [],
                "Admin": true
            },
            {
                "id": crypto.randomUUID(),
                "Login": "user",
                "Senha": "123",
                "Nome": "Usuario Comum",
                "Email": "user@abc.com",
                "Favoritos": [],
                "Admin": false
            }
        ]
        localStorage.setItem("Usuarios", JSON.stringify(UsuariosPadrao))
    }
}

function PuxarDadosUsuarios() {
    let DB = localStorage.getItem("Usuarios")
    return DB ? JSON.parse(DB) : []
}

function SalvarDadosUsuarios(DB) {
    localStorage.setItem("Usuarios", JSON.stringify(DB))
}

function LogarUsuario(Usuario) {
    sessionStorage.setItem("login", Usuario.Login)
    sessionStorage.setItem("Admin", Usuario.Admin)
    sessionStorage.removeItem("cadastrado")
    window.location.href = "http://127.0.0.1:5500/index.html"
}

function RealizarLogin() {
    const DB = PuxarDadosUsuarios()
    let Usuario = document.getElementById("UsuarioCampo").value
    let Senha = document.getElementById("SenhaCampo").value

    for (let i = 0; i < DB.length; i++) {
        if (DB[i].Login == Usuario && DB[i].Senha == Senha) {
            sessionStorage.removeItem("cadastrado")  // Limpa ao logar
            LogarUsuario(DB[i])
            return
        }
    }
    MensagemLoginErrado()
}

function CadastrarUsuario() {
    let Usuario = document.getElementById("UsuarioCampo").value
    let Senha = document.getElementById("SenhaCampo").value
    let Nome = document.getElementById("NomeCampo").value
    let Email = document.getElementById("EmailCampo").value

    if (Usuario == "" || Senha == "") {
        MensagemLoginErrado()
        return
    }

    let DB = PuxarDadosUsuarios()
    let UsuarioExiste = DB.some(u => u.Login == Usuario)

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

    DB.push(DadosUsuario)
    SalvarDadosUsuarios(DB)

    sessionStorage.setItem("cadastrado", "true") 
    CadastroAberto = true
    AbrirTelaCadastro()
}

function AbrirTelaCadastro() {
    let Cadastrado = sessionStorage.getItem("cadastrado") === "true" 
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
            sessionStorage.removeItem("cadastrado")  
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
    InicializarUsuarios()
    AbrirTelaCadastro()
})