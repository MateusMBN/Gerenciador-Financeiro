let cardLimit = 0;
let availableBalance = 0;

const cardLimitEl = document.getElementById("cardLimit");
const availableBalanceEl = document.getElementById("availableBalance");
const expenseList = document.getElementById("expenseList");

function setLimit() {
    cardLimit = parseFloat(document.getElementById("limitAmount").value) || 0;
    availableBalance = parseFloat(document.getElementById("availableAmount").value) || 0;

    cardLimitEl.innerText = cardLimit.toFixed(2);
    availableBalanceEl.innerText = availableBalance.toFixed(2);

    document.getElementById("limitAmount").value = "";
    document.getElementById("availableAmount").value = "";
}

function addExpense() {
    const description = document.getElementById("expenseDescription").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);

    if (!description || isNaN(amount) || amount > availableBalance) {
        alert("Por favor, insira uma descrição e um valor válido ou verifique se o valor não excede o saldo disponível.");
        return;
    }

    availableBalance -= amount;
    availableBalanceEl.innerText = availableBalance.toFixed(2);

    const expenseItem = document.createElement("li");
    expenseItem.innerHTML = `
        ${description} - R$ ${amount.toFixed(2)}
    `;
    expenseList.appendChild(expenseItem);

    document.getElementById("expenseDescription").value = "";
    document.getElementById("expenseAmount").value = "";
}
