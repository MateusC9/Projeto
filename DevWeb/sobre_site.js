const carrossel = document.querySelector('.carrossel');
const conteudos = document.querySelectorAll('.conteudo');
const btnAnterior = document.querySelector('#anterior');
const btnProximo = document.querySelector('#proximo');
let posicaoAtual = 0;
let intervalo;

function mostrarConteudo(posicao) {
  conteudos.forEach((conteudo, index) => {
    if (index === posicao) {
      conteudo.classList.add('ativo');
    } else {
      conteudo.classList.remove('ativo');
    }
  });
}

function moverCarrossel(direcao) {
  posicaoAtual += direcao;
  if (posicaoAtual < 0) {
    posicaoAtual = conteudos.length - 1;
  } else if (posicaoAtual >= conteudos.length) {
    posicaoAtual = 0;
  }
  mostrarConteudo(posicaoAtual);
}

function iniciarIntervalo() {
  intervalo = setInterval(() => {
    moverCarrossel(1);
  }, 3000);
}

function pararIntervalo() {
  clearInterval(intervalo);
}

btnAnterior.addEventListener('click', () => {
  pararIntervalo();
  moverCarrossel(-1);
  iniciarIntervalo();
});

btnProximo.addEventListener('click', () => {
  pararIntervalo();
  moverCarrossel(1);
  iniciarIntervalo();
});

// Mostrar o primeiro conteúdo ao carregar a página
mostrarConteudo(posicaoAtual);

// Iniciar o intervalo
iniciarIntervalo();
