const perguntaa = document.getElementById("pergunta");
const respostaa = document.getElementById("resposta");
const ss = document.getElementById("sim");
const nn = document.getElementById("nao");

let etapa = 0;
let genero = null;
let maisNovo = null;

function pergunta(texto) {
    perguntaa.textContent = texto;
    respostaa.textContent = "";
}

function resposta(texto) {
    respostaa.textContent = "O familiar é: " + texto;
    perguntaa.textContent = "";
    document.getElementById("buttons").style.display = "none";
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
                pergunta("Essa pessoa é filha dos seus pais?");
                etapa = 2;
            } else {
                pergunta("Essa pessoa é irmã(o) dos seus pais?");
                etapa = 3;
            }
            break;

        case 2:
            if (res) {
                resposta(genero ? "Sua irmã" : "Seu irmão");
            } else {
                resposta(genero ? "Sua prima" : "Seu primo");
            }
            break;

        case 3:
            if (res) {
                resposta(genero ? "Sua tia" : "Seu tio");
            } else {
                pergunta("Essa pessoa é pai/mãe dos seus pais?");
                etapa = 4;
            }
            break;

        case 4:
            if (res) {
                resposta(genero ? "Sua avó" : "Seu avô");
            } else {
                resposta(genero ? "Sua mãe" : "Seu pai");
            }
            break;
    }
}

ss.onclick = () => proximaEtapa(true);
nn.onclick = () => proximaEtapa(false);

pergunta("Seu personagem é mulher?");
