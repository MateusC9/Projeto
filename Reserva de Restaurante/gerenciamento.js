function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "menu_white_36dp.svg";
    } else {
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "close_white_36dp.svg";
    }
}

const tableStatus = {
    1: "Disponível",
    2: "Disponível",
    3: "Disponível",
    4: "Disponível",
    5: "Disponível",
    7: "Disponível",
    8: "Disponível",
    9: "Disponível",
    10: "Disponível",
    11: "Disponível",
    12: "Disponível",
    13: "Disponível",
    14: "Disponível",
    15: "Disponível",
    16: "Disponível",
    17: "Disponível",
    18: "Disponível",
    19: "Disponível",
};

function updateTableStatus() {
    for (let tableNumber in tableStatus) {
        const statusElement = document.getElementById(`table${tableNumber}Status`);
        if (statusElement) {
            statusElement.textContent = tableStatus[tableNumber];
        }
    }
}

function reserveTable(tableNumber) {
    if (tableStatus[tableNumber] === "Disponível") {
        tableStatus[tableNumber] = "Reservada";
        updateTableStatus();

        const buttons = document.getElementsByClassName("button");
        for (let i = 0; i < buttons.length; i++) {
            const buttonText = buttons[i].textContent;
            const buttonNumber = parseInt(buttonText.replace("Mesa ", ""), 10);

            if (buttonNumber === tableNumber) {
                buttons[i].style.backgroundColor = 'crimson';
                break;
            }
        }

        alert(`Mesa ${tableNumber} reservada com sucesso!`);
    } else {
        alert(`Mesa ${tableNumber} não disponível para reserva.`);
    }
}


function openModal() {
    document.getElementById('myModal').style.display = 'block';
    document.getElementById('modalOverlay').style.display = 'block';
    updateTableStatus();
}

