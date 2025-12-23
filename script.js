function executarAuditoria() {
    const bruto = parseFloat(document.getElementById('bruto').value);
    const liquido = parseFloat(document.getElementById('liquido').value);
    const taxaNominal = parseFloat(document.getElementById('taxaNominal').value);

    if (!bruto || !liquido || bruto <= liquido) {
        alert("Erro: Valores inválidos.");
        return;
    }

    const comissaoEuro = bruto - liquido;
    const taxaReal = (comissaoEuro / bruto) * 100;
    const diferencial = taxaReal - taxaNominal;

    document.getElementById('results').style.display = 'block';
    document.getElementById('btnPdf').style.display = 'block';
    document.getElementById('resEuro').innerText = comissaoEuro.toFixed(2) + " €";
    document.getElementById('resTaxa').innerText = taxaReal.toFixed(2) + " %";
    
    const diffDisplay = document.getElementById('resDif');
    diffDisplay.innerText = (diferencial > 0 ? "+" : "") + diferencial.toFixed(2) + " %";
    diffDisplay.style.color = diferencial > 0.05 ? "#d32f2f" : "#2e7d32";
}

function gerarPdfEvidencia() {
    const bruto = document.getElementById('bruto').value;
    const liquido = document.getElementById('liquido').value;
    const taxaReal = document.getElementById('resTaxa').innerText;
    const diferencial = document.getElementById('resDif').innerText;
    const dataRelatorio = new Date().toLocaleString('pt-PT');

    // Contentor com largura fixa e box-sizing para centralização perfeita da margem azul
    const htmlRelatorio = `
        <div style="width: 170mm; margin: 0 auto; padding: 15mm; border: 2mm solid #000080; box-sizing: border-box; font-family: Arial, sans-serif; background: #fff; height: 260mm;">
            <div style="text-align: center; border-bottom: 2px solid #000080; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #000080; margin: 0; font-size: 22px; text-transform: uppercase;">Relatório de Auditoria de Taxas</h1>
                <p style="font-weight: bold; margin: 5px 0;">Voz do Condutor - Inteligência TVDE</p>
            </div>
            <p style="font-size: 13px;"><strong>Data de Emissão:</strong> ${dataRelatorio}</p>
            <p style="font-size: 13px;"><strong>Entidade Responsável:</strong> VDC Voz do Condutor</p>
            <hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; margin-top: 30px; font-size: 16px;">
                <tr><td style="padding: 12px; border-bottom: 1px solid #eee;">Valor Bruto Cliente</td><td style="text-align: right; padding: 12px;">${bruto} €</td></tr>
                <tr><td style="padding: 12px; border-bottom: 1px solid #eee;">Valor Líquido Recebido</td><td style="text-align: right; padding: 12px;">${liquido} €</td></tr>
                <tr style="background: #f8f8f8;"><td style="padding: 12px;"><strong>Taxa Real Aplicada</strong></td><td style="text-align: right; padding: 12px;"><strong>${taxaReal}</strong></td></tr>
                <tr><td style="padding: 12px; color: #d32f2f;"><strong>Diferencial Detetado</strong></td><td style="text-align: right; padding: 12px; color: #d32f2f;"><strong>${diferencial}</strong></td></tr>
            </table>
            <div style="margin-top: 60px; font-size: 11px; color: #555; background: #f0f0f0; padding: 15px; border-radius: 4px; line-height: 1.5;">
                <strong>NOTA TÉCNICA:</strong> Este documento constitui um registo de evidência digital. Para validade jurídica plena em processos de contencioso, deve ser acompanhado pelo Parecer Técnico assinado pelo Perito da VDC.
            </div>
        </div>
    `;

    const opt = {
        margin: 5,
        filename: 'Auditoria_Taxas_VDC.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(htmlRelatorio).set(opt).save();
}
