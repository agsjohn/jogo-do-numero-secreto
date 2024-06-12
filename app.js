let numeroMaximo = 10;
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

exibirMensagemInicial();

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirTextoComVoz(tag, texto){
    exibirTextoNaTela(tag, texto);
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', "Jogo do número secreto");
    exibirTextoComVoz('p', `Escolha um número entre 1 e ${numeroMaximo}`);
}

function verificarChute(){
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoComVoz("h1", "Acertou!");
        exibirTextoNaTela("p", `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else{
        tentativas++;
        if(chute > numeroSecreto){
            exibirTextoComVoz("p", "O número é menor do que o chute");
        } else{
            exibirTextoComVoz("p", "O número é maior do que o chute");
        }
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeElementosLista = listaDeNumerosSorteados.length;
    if(quantidadeElementosLista == numeroMaximo){
        listaDeNumerosSorteados = []
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        if(listaDeNumerosSorteados)
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}