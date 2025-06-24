const perguntaa = document.getElementById("pergunta");
const respostaa = document.getElementById("resposta");
const ss = document.getElementById("sim");
const nn = document.getElementById("nao");

let etapa = 0;
let genero = null;
let maisNovo = null;
let filhoDaTiaOuTio = null;
let irmaoDaMae = null;
let primoMaisVelhoQuePai = null;

function pergunta(texto) {
    perguntaa.textContent = texto;
    respostaa.textContent = "";
}

function resposta(texto) {
    respostaa.textContent = "O familiar é: " + texto;
    perguntaa.textContent = "";
}

function proximaEtapa(res) {
    switch (etapa) {
        case 0:
            genero = res;
            pergunta("Essa pessoa é mais nova que seus pais?");
            etapa = 1;
            break;

        case 1:
            maisNovo = res;
            if (maisNovo) {
                pergunta("Essa pessoa é filha da sua mãe?");
                etapa = 2;
            } else {
                pergunta("Essa pessoa é primo(a)?");
                etapa = 6;
            }
            break;

        case 2:
            if (res) {
                resposta(genero ? "Sua irmã" : "Seu irmão");
            } else {
                pergunta("Essa pessoa é filha da sua tia ou tio?");
                etapa = 3;
            }
            break;

        case 3:
            filhoDaTiaOuTio = res;
            if (filhoDaTiaOuTio) {
                resposta(genero ? "Sua prima" : "Seu primo");
            } else {
                pergunta("Essa pessoa é mãe/pai da sua mãe?");
                etapa = 4;
            }
            break;

        case 4:
            if (res) {
                resposta(genero ? "Sua avó" : "Seu avô");
            } else {
                pergunta("Essa pessoa é irmã(o) da sua mãe?");
                etapa = 5;
            }
            break;

        case 5:
            irmaoDaMae = res;
            if (irmaoDaMae) {
                resposta(genero ? "Sua tia" : "Seu tio");
            } else {
                resposta(genero ? "Sua mãe" : "Seu pai");
            }
            break;

        case 6:
            primoMaisVelhoQuePai = res;
            if (primoMaisVelhoQuePai) {
                resposta(genero ? "Sua prima" : "Seu primo");
            } else {
                pergunta("Essa pessoa é irmã(o) da sua mãe?");
                etapa = 5;
            }
            break;
    }
}

ss.onclick = () => proximaEtapa(true);
nn.onclick = () => proximaEtapa(false);

pergunta("Seu personagem é mulher?");
