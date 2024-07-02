function medirNivelAgua() {
    // Simulação da medição do nível de água
    const nivelAgua = Math.random() * 100;
    const horaRequisicao = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    document.getElementById('resultado').innerText = `Nível de água: ${nivelAgua.toFixed(2)}%`;
    document.getElementById('hora-requisicao').innerText = `Hora da requisição: ${horaRequisicao}`;
}

function atualizarHoraAtual() {
    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('hora-atual').innerText = `Hora atual: ${hora}`;
}

// Atualiza a hora atual a cada segundo
setInterval(atualizarHoraAtual, 1000);

// Chama a função para exibir a hora imediatamente ao carregar a página
atualizarHoraAtual();
