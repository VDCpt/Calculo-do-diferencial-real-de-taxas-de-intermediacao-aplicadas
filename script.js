/**
 * Lógica de Auditoria VDC
 * Eduardo Monteiro - Auditoria e Peritagem
 */

function executarAuditoria() {
    // 1. Captura de Dados
    const bruto = parseFloat(document.getElementById('bruto').value);
    const liquido = parseFloat(document.getElementById('liquido').value);
    const taxaNominal = parseFloat(document.getElementById('taxaNominal').value);

    // 2. Validação de Entrada
    if (!bruto || !liquido || bruto <= liquido) {
        alert("Erro: O valor bruto deve ser superior ao líquido para cálculo de comissão.");
        return;
    }

    // 3. Cálculos de Peritagem
    const comissaoEuro = bruto - liquido;
    const taxaReal = (comissaoEuro / bruto) * 100;
    const diferencial = taxaReal - taxaNominal;

    // 4. Atualização da Interface
    document.getElementById('results').style.display = 'block';
    document.getElementById('btnPdf').style.display = 'block';

    document.getElementById('resEuro').innerText = comissaoEuro.toFixed(2) + " €";
    document.getElementById('resTaxa').innerText = taxaReal.toFixed(2) + " %";
    
    const diffDisplay = document.getElementById('resDif');
    diffDisplay.innerText = (diferencial > 0 ? "+" : "") + diferencial.toFixed(2) + " %";
    
    // Alerta visual se houver discrepância negativa para o motorista
    diffDisplay.style.color = diferencial > 0.05 ? "#d32f2f" : "#2e7d32";

    console.log("Auditoria Executada: Diferencial de " + diferencial.toFixed(2) + "%");
}

function gerarPdfEvidencia() {
    const bruto = document.getElementById('bruto').value;
    const liquido = document.getElementById('liquido').value;
    const taxaReal = document.getElementById('resTaxa').innerText;
    const diferencial = document.getElementById('resDif').innerText;

    const dataRelatorio = new Date().toLocaleString('pt-PT');

    const htmlRelatorio = `
        <div style="font-family: Arial, sans-serif; padding: 40px; border: 4px solid #000080; color: #333;">
            <div style="text-align: center; border-bottom: 2px solid #000080; padding-bottom: 10px; margin-bottom: 20px;">
                <h1 style="color: #000080; margin: 0; font-size: 20px;">RELATÓRIO DE AUDITORIA DE TAXAS</h1>
                <p style="font-weight: bold;">Voz do Condutor - Inteligência TVDE</p>
            </div>
            
            <p><strong>Data de Emissão:</strong> ${dataRelatorio}</p>
            <p><strong>Entidade Responsável:</strong> VDC Voz do Condutor</p>
            <hr>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;">Valor Bruto Cliente</td><td style="text-align: right;">${bruto} €</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;">Valor Líquido Recebido</td><td style="text-align: right;">${liquido} €</td></tr>
                <tr style="background: #f4f4f4;"><td style="padding: 8px;"><strong>Taxa Real Aplicada</strong></td><td style="text-align: right;"><strong>${taxaReal}</strong></td></tr>
                <tr><td style="padding: 8px; color: red;"><strong>Diferencial Detetado</strong></td><td style="text-align: right; color: red;"><strong>${diferencial}</strong></td></tr>
            </table>

            <div style="margin-top: 40px; font-size: 10px; color: #555; background: #eee; padding: 10px;">
                <strong>NOTA TÉCNICA:</strong> Este documento constitui um registo de evidência digital. 
                Para validade jurídica plena em processos de contencioso, deve ser acompanhado pelo Parecer Técnico assinado pelo Perito da VDC.
            </div>
        </div>
    `;

    const opt = {
        margin: 10,
        filename: 'Evidencia_Taxas_VDC.pdf',
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(htmlRelatorio).set(opt).save();
}
