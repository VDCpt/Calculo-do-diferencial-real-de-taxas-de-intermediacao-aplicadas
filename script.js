function calcularAuditoria() {
    // Obtenção dos dados brutos
    const bruto = parseFloat(document.getElementById('bruto').value);
    const liquido = parseFloat(document.getElementById('liquido').value);
    const taxaNominal = parseFloat(document.getElementById('taxaNominal').value);

    if (isNaN(bruto) || isNaN(liquido) || isNaN(taxaNominal)) {
        alert("Por favor, insira valores válidos para análise.");
        return;
    }

    // Cálculos de Auditoria
    const comissaoRetidaEuro = bruto - liquido;
    const taxaRealAplicada = (comissaoRetidaEuro / bruto) * 100;
    const diferencial = taxaRealAplicada - taxaNominal;

    // Exibição de resultados com rigor técnico
    document.getElementById('results').style.display = 'block';
    document.getElementById('resComisEuro').innerText = comissaoRetidaEuro.toFixed(2) + " €";
    document.getElementById('resTaxaReal').innerText = taxaRealAplicada.toFixed(2) + " %";
    
    const diffElement = document.getElementById('resDif');
    if (diferencial > 0) {
        diffElement.innerText = "+" + diferencial.toFixed(2) + " % acima do nominal";
        diffElement.style.color = "#d32f2f"; // Alerta vermelho
    } else {
        diffElement.innerText = diferencial.toFixed(2) + " % (Dentro da conformidade)";
        diffElement.style.color = "#2e7d32"; // Conformidade verde
    }

    console.log("Auditoria VDC concluída: Discrepância calculada.");
}
