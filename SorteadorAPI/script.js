function verificarTipoSorteio() {
    var tipoSorteio = document.getElementById("tipoSorteio").value;
    var totalResultadosGroup = document.getElementById("totalResultadosGroup");
    var totalResultadosInput = document.getElementById("totalResultadosInput");

    // Limpar resultados antigos de sorteio
    const elementoHTMLResultValues = document.querySelector('.results-values');
    elementoHTMLResultValues.innerHTML = '';

    if (tipoSorteio === "brindes") {
        totalResultadosGroup.style.display = "block"; // Exibir o campo de total de resultados
    } else {
        totalResultadosInput.value = 1;
        totalResultadosGroup.style.display = "none"; // Esconder o campo de total de resultados
    }

    // Limpar resultados da API
    const elementoHTMLResponse = document.querySelector('.response');
    elementoHTMLResponse.innerHTML = '';
}

async function sortear() {
    // Pegar o total de resultados
    var tipoSorteio = document.getElementById("tipoSorteio").value;
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
            var elementoHTMLDoResultado = document.createElement('div');
            elementoHTMLDoResultado.classList.add('result-value');
            elementoHTMLDoResultado.innerText = resultado;
            var result = resultado
            // Adicionar o elemento criado dentro do HTML existente
            elementoHTMLResultValues.append(elementoHTMLDoResultado);
        }
        
        await wait(50);
    }

    if(tipoSorteio == 'Carneiro'){
        // Cria um objeto com o valor de result
        const requestBody = {
            result: result
        };
        
        // Configura a opção do fetch para fazer uma requisição POST
        const fetchOptions = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody) // Converte o objeto em JSON
        };
        console.log(requestBody.result)

        const elementoHTML = document.querySelector('.response');
        elementoHTML.innerHTML = '';
        var message = document.createElement('div');
        message.classList.add('message');
        message.innerText = `Realizando busca...`;
        elementoHTML.append(message);
        
        // Faz a requisição POST para a API
        fetch("https://apiinova.onrender.com/", fetchOptions)
            .then(function(response) {
            if (!response.ok) {
                const elementoHTML = document.querySelector('.response');
                elementoHTML.innerHTML = '';
                var notfound = document.createElement('div');
                notfound.classList.add('error');
                notfound.innerText = `Falha ao realizar busca por clientes! ${response.status}`;
                elementoHTML.append(notfound);
                throw new Error("A requisição falhou com status: " + response.status);
            }
            return response.json();
            })
            .then(function(data) {
                if(data.error){
                    const elementoHTML = document.querySelector('.response');
                    elementoHTML.innerHTML = '';
                    var notfound = document.createElement('div');
                    notfound.classList.add('notfound');
                    notfound.innerText = data.error;
                    elementoHTML.append(notfound);
                    // resultHTML.innerHTML = data.error;
                }
                else{
                    const elementoHTML = document.querySelector('.response');
                    elementoHTML.innerHTML = '';

                    var clienteHTML = document.createElement('div');
                    clienteHTML.classList.add('cliente');
                    clienteHTML.innerText = `Cliente: ${data.cliente}`;

                    elementoHTML.append(clienteHTML);

                    var clienteTelHTML = document.createElement('div');
                    clienteTelHTML.classList.add('telefone');
                    clienteTelHTML.innerText = `Telefone p/ contato: ${data.telefone}`;

                    elementoHTML.append(clienteTelHTML);

                    var vendedorHTML = document.createElement('div');
                    vendedorHTML.classList.add('vendedor');
                    vendedorHTML.innerText = `Vendedor(a): ${data.vendedor}`;

                    elementoHTML.append(vendedorHTML);

                }
            console.log(data);        
            })
            .catch(function(error) {
            console.error("Erro na requisição: " + error.message);
            });

            // A api retorna os seguintes valores: nome do vendedor, nome do cliente, telefone e ponto comprado, 
            // caso seja necessário ou de interesse que sejam retornadas mais informações, só entrar em contato 
            // commigo para que eu faça as alterações necessárias

    }   
}

function wait(tempo){
    return new Promise((resolve) => {
        setTimeout(() => resolve(), tempo);
    });
}
