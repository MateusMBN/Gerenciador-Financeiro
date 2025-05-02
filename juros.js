function calculateCompoundInterest() {
    // Obter valores dos inputs
    const principal = parseFloat(document.getElementById("principal").value);
    const rate = parseFloat(document.getElementById("rate").value) / 100;
    const time = parseInt(document.getElementById("time").value);

    // Verificação dos valores de entrada
    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        alert("Por favor, preencha todos os campos com valores válidos.");
        return;
    }

    // Cálculo do montante final com juros compostos
    const finalAmount = principal * Math.pow((1 + rate), time);
    document.getElementById("result").textContent = finalAmount.toFixed(2);

    // Dados para o gráfico
    const data = [];
    for (let i = 0; i <= time; i++) {
        data.push(principal * Math.pow((1 + rate), i));
    }

    // Configuração do gráfico de crescimento
    const ctx = document.getElementById("growthChart").getContext("2d");
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: time + 1 }, (_, i) => `${i} anos`),
            datasets: [{
                label: 'Crescimento do Montante',
                data: data,
                backgroundColor: 'rgba(86, 182, 139, 0.5)',
                borderColor: '#56b68b',
                borderWidth: 2,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Anos'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Montante (R$)'
                    }
                }
            }
        }
    });
}
