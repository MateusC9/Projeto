async function sortear() {
    // Pegar o total de resultados
    const totalResultados = Number(document.querySelector('#totalResultadosInput').value);

    // Pegar o menor valor
    const menorValor = Number(document.querySelector('#menorValorInput').value);

    // Pegar o maior valor
    const maiorValor = Number(document.querySelector('#maiorValorInput').value);

    for (let j = 0; j < 20; j++) {
        // Limpar resultados antigos
        const elementoHTMLResultValues = document.querySelector('.results-values');
        elementoHTMLResultValues.innerHTML = '';

        const generatedNumbers = new Set();

        for (let i = 0; i < totalResultados; i++) {
            let resultado;
            do {
                // Gerar um número aleatório entre o menor e o maior valor
                resultado = Math.floor(Math.random() * (maiorValor - menorValor + 1)) + menorValor;
            } while (generatedNumbers.has(resultado));

            generatedNumbers.add(resultado);

            // Gerar um elemento HTML para o resultado
            const elementoHTMLDoResultado = document.createElement('div');
            elementoHTMLDoResultado.classList.add('result-value');
            elementoHTMLDoResultado.innerText = resultado;

            // Adicionar o elemento criado dentro do HTML existente
            elementoHTMLResultValues.append(elementoHTMLDoResultado);
        }

        await wait(50);
    }
}

function wait(tempo){
    return new Promise((resolve) => {
        setTimeout(() => resolve(), tempo);
    });
}
