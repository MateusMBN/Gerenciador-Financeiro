const transactionList = document.getElementById("transactionList");
const balanceEl = document.getElementById("balance");
const expenseChartCtx = document.getElementById("expenseChart").getContext("2d");

let balance = 0;
let transactions = [];
let categoryTotals = { Alimentação: 0, Lazer: 0, Transporte: 0, Outros: 0 };

function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    if (!description || isNaN(amount)) {
        alert("Por favor, insira uma descrição e um valor válido.");
        return;
    }

    const transaction = { description, amount, category };
    transactions.push(transaction);

    balance += amount;
    balanceEl.innerText = `R$ ${balance.toFixed(2)}`; 

    categoryTotals[category] += amount;
    displayTransaction(transaction);
    updateChart();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function displayTransaction(transaction) {
    const transactionItem = document.createElement("li");
    transactionItem.classList.add(transaction.amount < 0 ? "expense" : "income");
    transactionItem.innerHTML = `
        ${transaction.description} - R$ ${transaction.amount.toFixed(2)}
        <span>${transaction.category}</span>
    `;
    transactionList.appendChild(transactionItem);
}

const expenseChart = new Chart(expenseChartCtx, {
    type: 'pie',
    data: {
        labels: Object.keys(categoryTotals),
        datasets: [{
            data: Object.values(categoryTotals),
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0"]
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    }
});

function updateChart() {
    expenseChart.data.datasets[0].data = Object.values(categoryTotals);
    expenseChart.update();
}
