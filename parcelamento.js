// Array para armazenar as dívidas
let debts = [];

function addDebt() {
    // Obter valores dos inputs
    const description = document.getElementById("debtDescription").value;
    const totalAmount = parseFloat(document.getElementById("totalAmount").value);
    const numInstallments = parseInt(document.getElementById("numInstallments").value);

    // Verificar se os valores são válidos
    if (description === "" || isNaN(totalAmount) || isNaN(numInstallments) || numInstallments <= 0) {
        alert("Por favor, preencha todos os campos com valores válidos.");
        return;
    }

    // Calcular valor da parcela
    const installmentAmount = totalAmount / numInstallments;

    // Adicionar a nova dívida ao array
    debts.push({
        description: description,
        totalAmount: totalAmount,
        numInstallments: numInstallments,
        installmentAmount: installmentAmount,
        remainingInstallments: numInstallments
    });

    // Limpar campos de entrada
    document.getElementById("debtDescription").value = "";
    document.getElementById("totalAmount").value = "";
    document.getElementById("numInstallments").value = "";

    // Atualizar lista de dívidas
    updateDebtList();
}

function updateDebtList() {
    // Selecionar o elemento da lista de dívidas
    const debtList = document.getElementById("debtList");
    debtList.innerHTML = "";

    // Percorrer cada dívida e criar um item de lista
    debts.forEach((debt, index) => {
        const listItem = document.createElement("li");

        // Exibir descrição, valor da parcela, e parcelas restantes
        listItem.innerHTML = `
            <strong>${debt.description}</strong>: R$${debt.installmentAmount.toFixed(2)} por ${debt.remainingInstallments} meses restantes.
            <button onclick="payInstallment(${index})">Pagar Parcela</button>
        `;

        debtList.appendChild(listItem);
    });
}

function payInstallment(index) {
    // Reduzir o número de parcelas restantes
    debts[index].remainingInstallments -= 1;

    // Remover a dívida da lista se todas as parcelas foram pagas
    if (debts[index].remainingInstallments === 0) {
        debts.splice(index, 1);
    }

    // Atualizar lista de dívidas
    updateDebtList();
}
