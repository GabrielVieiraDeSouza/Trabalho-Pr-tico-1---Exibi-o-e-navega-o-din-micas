

function VerificarSeEhAdmin() {
    let LoginAtual = sessionStorage.getItem("login")

    if (!LoginAtual) {
        window.location.href = "/public/Login's/Login.html"
        return
    }

    let EhAdmin = sessionStorage.getItem("Admin") === "true"

    if (!EhAdmin) {
        window.location.href = "/"
    }
}




function PuxarDados() {
    let DadosSalvos = localStorage.getItem("Midia")

    if (DadosSalvos) {
        return JSON.parse(DadosSalvos)
    } else {
        return []
    }
}

function SalvarDados(ListaDeJogos) {
    localStorage.setItem("Midia", JSON.stringify(ListaDeJogos))
}

function PuxarDadosUsuarios() {
    let DadosSalvos = localStorage.getItem("Usuarios")

    if (DadosSalvos) {
        return JSON.parse(DadosSalvos)
    } else {
        return []
    }
}

function SalvarDadosUsuarios(ListaDeUsuarios) {
    localStorage.setItem("Usuarios", JSON.stringify(ListaDeUsuarios))
}

function BuscarUsuarioLogado() {
    let LoginAtual = sessionStorage.getItem("login")

    if (!LoginAtual) {
        return null
    }

    let ListaDeUsuarios = PuxarDadosUsuarios()

    for (let i = 0; i < ListaDeUsuarios.length; i++) {
        if (ListaDeUsuarios[i].Login == LoginAtual) {
            return ListaDeUsuarios[i]
        }
    }

    return null
}

function EhFavorito(JogoID) {
    let Usuario = BuscarUsuarioLogado()

    if (!Usuario) {
        return false
    }

    for (let i = 0; i < Usuario.Favoritos.length; i++) {
        if (String(Usuario.Favoritos[i]) === String(JogoID)) {
            return true
        }
    }

    return false
}

function AlternarFavorito(JogoID) {
    let LoginAtual = sessionStorage.getItem("login")

    if (!LoginAtual) {
        return null
    }

    let ListaDeUsuarios = PuxarDadosUsuarios()
    let Usuario = null

    for (let i = 0; i < ListaDeUsuarios.length; i++) {
        if (ListaDeUsuarios[i].Login == LoginAtual) {
            Usuario = ListaDeUsuarios[i]
        }
    }

    if (!Usuario) {
        return null
    }

    let JaEhFavorito = false

    for (let i = 0; i < Usuario.Favoritos.length; i++) {
        if (String(Usuario.Favoritos[i]) === String(JogoID)) {
            JaEhFavorito = true
        }
    }

    if (JaEhFavorito) {
        let NovaListaDeFavoritos = []

        for (let i = 0; i < Usuario.Favoritos.length; i++) {
            if (String(Usuario.Favoritos[i]) !== String(JogoID)) {
                NovaListaDeFavoritos.push(Usuario.Favoritos[i])
            }
        }

        Usuario.Favoritos = NovaListaDeFavoritos
    } else {
        Usuario.Favoritos.push(JogoID)
    }

    SalvarDadosUsuarios(ListaDeUsuarios)

    if (JaEhFavorito) {
        return false
    } else {
        return true
    }
}
let CorpoCardsContainerCards = document.getElementById("CorpoCardsContainerCards")
let TemplateCard = document.getElementById("TemplateCard")

function PreencherSeletorDeJogos(Seletor) {
    Seletor.innerHTML = ""

    let ListaDeJogos = PuxarDados()

    for (let i = 0; i < ListaDeJogos.length; i++) {
        let Opcao = document.createElement("option")
        Opcao.value = i
        Opcao.textContent = ListaDeJogos[i].Nome
        Seletor.appendChild(Opcao)
    }
}



function LigarBotaoAdicionar() {
    let Botao = document.getElementById("BotaoAdicionarJogo")
    let Modal = new bootstrap.Modal(document.getElementById("ModalAdicionarJogo"))
    let Formulario = document.getElementById("FormularioAdicionarJogo")
    let Mensagem = document.getElementById("MensagemAdicionarJogo")

    Botao.addEventListener("click", function () {
        Formulario.reset()
        Mensagem.textContent = ""
        Modal.show()
    })

    Formulario.addEventListener("submit", function (event) {
        event.preventDefault()

        let Nome = document.getElementById("CampoNomeNovoJogo").value.trim()
        let Estudio = document.getElementById("CampoEstudioNovoJogo").value.trim()
        let LogoCard = document.getElementById("CampoLogoNovoJogo").value.trim()
        let HomePage = document.getElementById("CampoHomePageNovoJogo").value.trim()
        let Sinopse = document.getElementById("CampoSinopseNovoJogo").value.trim()
        let Descricao = document.getElementById("CampoDescricaoNovoJogo").value.trim()
        let Historia = document.getElementById("CampoHistoriaNovoJogo").value.trim()
        let Trailer = document.getElementById("CampoTrailerNovoJogo").value.trim()

        if (!Nome || !Estudio || !LogoCard || !HomePage) {
            Mensagem.textContent = "Preencha pelo menos nome, estúdio, imagem e texto curto."
            return
        }

        let NovoJogo = {
            Nome: Nome,
            Descricao: HomePage,
            DicionarioDescricoes: {
                HomePage: HomePage,
                Sinopse: Sinopse,
                Descricao_Do_Jogo: Descricao,
                Historia_Do_Estudio: Historia,
                Complementos: {},
                TrailerJogo: Trailer
            },
            Semelhantes: [],
            LogoCard: LogoCard,
            Estudio: Estudio,
            id: "jogo-" + Date.now()
        }

        let ListaDeJogos = PuxarDados()
        ListaDeJogos.push(NovoJogo)
        SalvarDados(ListaDeJogos)

        Modal.hide()
        CarregarCardsCRUD()
    })
}



function LigarBotaoRemover() {
    let Botao = document.getElementById("BotaoRemoverJogo")
    let Modal = new bootstrap.Modal(document.getElementById("ModalRemoverJogo"))
    let Seletor = document.getElementById("SeletorJogoRemover")
    let Mensagem = document.getElementById("MensagemRemoverJogo")

    Botao.addEventListener("click", function () {
        PreencherSeletorDeJogos(Seletor)
        Mensagem.textContent = ""
        Modal.show()
    })

    document.getElementById("BotaoConfirmarRemocao").addEventListener("click", function () {
        if (Seletor.value === "") {
            Mensagem.textContent = "Escolha um jogo antes de confirmar."
            return
        }

        let IndiceRemovido = Number(Seletor.value)
        RemoverJogo(IndiceRemovido)

        Modal.hide()
        CarregarCardsCRUD()
    })
}

function RemoverJogo(IndiceRemovido) {
    let ListaDeJogos = PuxarDados()
    ListaDeJogos.splice(IndiceRemovido, 1)

    for (let i = 0; i < ListaDeJogos.length; i++) {
        let Semelhantes = ListaDeJogos[i].Semelhantes || []
        let NovosSemelhantes = []

        for (let j = 0; j < Semelhantes.length; j++) {
            let Indice = Semelhantes[j]

            if (Indice === IndiceRemovido) {
                continue // esse jogo não existe mais
            }

            if (Indice > IndiceRemovido) {
                NovosSemelhantes.push(Indice - 1)
            } else {
                NovosSemelhantes.push(Indice)
            }
        }

        ListaDeJogos[i].Semelhantes = NovosSemelhantes
    }

    SalvarDados(ListaDeJogos)

    let ListaDeUsuarios = PuxarDadosUsuarios()

    for (let i = 0; i < ListaDeUsuarios.length; i++) {
        let Favoritos = ListaDeUsuarios[i].Favoritos || []
        let NovosFavoritos = []

        for (let j = 0; j < Favoritos.length; j++) {
            let Indice = Number(Favoritos[j])

            if (Indice === IndiceRemovido) {
                continue
            }

            if (Indice > IndiceRemovido) {
                NovosFavoritos.push(Indice - 1)
            } else {
                NovosFavoritos.push(Indice)
            }
        }

        ListaDeUsuarios[i].Favoritos = NovosFavoritos
    }

    SalvarDadosUsuarios(ListaDeUsuarios)
}

function PreencherFormularioDeAlteracao(Indice) {
    let ListaDeJogos = PuxarDados()
    let Jogo = ListaDeJogos[Indice]

    if (!Jogo) {
        return
    }

    document.getElementById("CampoNomeAlterar").value = Jogo.Nome || ""
    document.getElementById("CampoEstudioAlterar").value = Jogo.Estudio || ""
    document.getElementById("CampoLogoAlterar").value = Jogo.LogoCard || ""
    document.getElementById("CampoHomePageAlterar").value = Jogo.DicionarioDescricoes.HomePage || ""
    document.getElementById("CampoSinopseAlterar").value = Jogo.DicionarioDescricoes.Sinopse || ""
    document.getElementById("CampoDescricaoAlterar").value = Jogo.DicionarioDescricoes.Descricao_Do_Jogo || ""
    document.getElementById("CampoHistoriaAlterar").value = Jogo.DicionarioDescricoes.Historia_Do_Estudio || ""
    document.getElementById("CampoTrailerAlterar").value = Jogo.DicionarioDescricoes.TrailerJogo || ""
}

function LigarBotaoAlterar() {
    let Botao = document.getElementById("BotaoAlterarJogo")
    let Modal = new bootstrap.Modal(document.getElementById("ModalAlterarJogo"))
    let Seletor = document.getElementById("SeletorJogoAlterar")
    let Formulario = document.getElementById("FormularioAlterarJogo")
    let Mensagem = document.getElementById("MensagemAlterarJogo")

    Botao.addEventListener("click", function () {
        PreencherSeletorDeJogos(Seletor)
        Mensagem.textContent = ""

        if (Seletor.options.length > 0) {
            Seletor.selectedIndex = 0
            PreencherFormularioDeAlteracao(Number(Seletor.value))
        }

        Modal.show()
    })

    Seletor.addEventListener("change", function () {
        PreencherFormularioDeAlteracao(Number(Seletor.value))
    })

    Formulario.addEventListener("submit", function (event) {
        event.preventDefault()

        let Indice = Number(Seletor.value)
        let Nome = document.getElementById("CampoNomeAlterar").value.trim()
        let Estudio = document.getElementById("CampoEstudioAlterar").value.trim()
        let LogoCard = document.getElementById("CampoLogoAlterar").value.trim()
        let HomePage = document.getElementById("CampoHomePageAlterar").value.trim()
        let Sinopse = document.getElementById("CampoSinopseAlterar").value.trim()
        let Descricao = document.getElementById("CampoDescricaoAlterar").value.trim()
        let Historia = document.getElementById("CampoHistoriaAlterar").value.trim()
        let Trailer = document.getElementById("CampoTrailerAlterar").value.trim()

        if (!Nome || !Estudio || !LogoCard || !HomePage) {
            Mensagem.textContent = "Preencha pelo menos nome, estúdio, imagem e texto curto."
            return
        }

        let ListaDeJogos = PuxarDados()
        let Jogo = ListaDeJogos[Indice]

        Jogo.Nome = Nome
        Jogo.Estudio = Estudio
        Jogo.LogoCard = LogoCard
        Jogo.Descricao = HomePage
        Jogo.DicionarioDescricoes.HomePage = HomePage
        Jogo.DicionarioDescricoes.Sinopse = Sinopse
        Jogo.DicionarioDescricoes.Descricao_Do_Jogo = Descricao
        Jogo.DicionarioDescricoes.Historia_Do_Estudio = Historia
        Jogo.DicionarioDescricoes.TrailerJogo = Trailer

        SalvarDados(ListaDeJogos)

        Modal.hide()
        CarregarCardsCRUD()
    })
}

function LigarBotoesDeAcao() {
    LigarBotaoAdicionar()
    LigarBotaoRemover()
    LigarBotaoAlterar()
}


let Logado = sessionStorage.getItem("login")

function ValidarLogin() {
    let TemplateBotoes = document.getElementById("TemplateBotõesCabeçalho").content
    let BotaoLogin = TemplateBotoes.getElementById("TemplateBotãoCabeçalhoLogin").cloneNode(true)
    let BotaoLogout = TemplateBotoes.getElementById("TemplateBotãoCabeçalhoLogout").cloneNode(true)
    let BotaoFavoritos = TemplateBotoes.getElementById("TemplateBotãoCabeçalhoFavoritos").cloneNode(true)
    let ContainerCabecalho = document.getElementById("BotõesCabeçalho")

    if (Logado) {
        ContainerCabecalho.appendChild(BotaoFavoritos)
        ContainerCabecalho.appendChild(BotaoLogout)

        BotaoLogout.addEventListener("click", function () {
            sessionStorage.removeItem("login")
            sessionStorage.removeItem("Admin")
            window.location.href = "/public/Login's/Login.html"
        })

        BotaoFavoritos.addEventListener("click", function () {
            window.location.href = "/public/Favoritos/Favoritos.html"
        })
    } else {
        ContainerCabecalho.appendChild(BotaoLogin)

        BotaoLogin.addEventListener("click", function () {
            window.location.href = "/public/Login's/Login.html"
        })
    }
}



document.addEventListener("DOMContentLoaded", function () {
    VerificarSeEhAdmin()
    ValidarLogin()
    LigarBotoesDeAcao()
})