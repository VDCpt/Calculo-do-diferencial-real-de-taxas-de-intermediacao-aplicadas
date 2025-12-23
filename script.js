/**
 * VDC - Unidade de Inteligência e Tecnologia TVDE
 * Script de Auditoria de Fluxo Financeiro e Diferencial de Taxas
 * © 2025 VDC | vozdocondutor.com
 */

function calcularAuditoria() {
    // 1. Extração de Dados Brutos dos Inputs
    const bruto = parseFloat(document.getElementById('bruto').value);
    const liquido = parseFloat(document.getElementById('liquido').value);
    const taxaNominal = parseFloat(document.getElementById('taxaNominal').value);

    // 2. Validação de Integridade dos Dados
    if (isNaN(bruto) || isNaN(liquido) || isNaN(taxaNominal) || bruto <= 0) {
        alert("Erro de Entrada: Por favor, insira valores numéricos válidos para análise pericial.");
        return;
    }

    // 3. Cálculos Forenses
    const comissaoRetidaEuro = bruto - liquido;
    const taxaRealAplicada = (comissaoRetidaEuro / bruto) * 100;
    const diferencial = taxaRealAplicada - taxaNominal;

    // 4. Exibição Dinâmica de Resultados
    const resultsDiv = document.getElementById('results');
    resultsDiv.style.display = 'block';

    document.getElementById('resComisEuro').innerText = comissaoRetidaEuro.toFixed(2) + " €";
    document.getElementById('resTaxaReal').innerText = taxaRealAplicada.toFixed(2) + " %";
    
    const diffElement = document.getElementById('resDif');
    
    // 5. Lógica de Conformidade (Diferencial)
    if (diferencial > 0.01) { // Margem de erro mínima considerada
        diffElement.innerText = "+" + diferencial.toFixed(2) + " % acima do nominal";
        diffElement.style.color = "#d32f2f"; // Alerta: Discrepância detetada
    } else {
        diffElement.innerText = diferencial.toFixed(2) + " % (Em conformidade)";
        diffElement.style.color = "#2e7d32"; // Status: OK
    }

    console.log("Auditoria VDC: Simulação concluída com sucesso.");
}

/**
 * Função para gerar Relatório de Evidência em PDF
 * Utiliza a biblioteca html2pdf.js
 */
function gerarPdfEvidencia() {
    const bruto = document.getElementById('bruto').value;
    const liquido = document.getElementById('liquido').value;
    const taxaReal = document.getElementById('resTaxaReal').innerText;
    const diferencial = document.getElementById('resDif').innerText;

    if (!bruto || !liquido || taxaReal === "-") {
        alert("Ação Negada: Execute o cálculo de auditoria antes de exportar a evidência.");
        return;
    }

    // Estrutura do Documento de Prova
    const conteudo = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; border: 3px solid #000080; color: #333;">
            <div style="text-align: center; border-bottom: 2px solid #000080; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #000080; margin: 0; font-size: 22px;">REGISTO DE EVIDÊNCIA DE AUDITORIA</h1>
                <p style="font-size: 14px; font-weight: bold;">Voz do Condutor - Análise de Fluxo Financeiro TVDE</p>
                <p style="font-size: 12px;">Entidade: VDC</p>
            </div>
            
            <div style="margin-bottom: 20px;">
                <p><strong>Data/Hora da Extração:</strong> ${new Date().toLocaleString('pt-PT')}</p>
                <p><strong>ID da Simulação:</strong> VDC-${Math.floor(Math.random() * 1000000)}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr style="background-color: #f4f7f9;">
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Valor Bruto (Pago pelo Cliente)</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${bruto} €</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Valor Líquido (Recebido pelo Operador)</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${liquido} €</td>
                </tr>
                <tr style="background-color: #f4f7f9;">
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Taxa Real Aplicada</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${taxaReal}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #ddd; color: #d32f2f;"><strong>Diferencial Detetado</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd; text-align: right; color: #d32f2f; font-weight: bold;">${diferencial}</td>
                </tr>
            </table>

            <div style="margin-top: 40px; padding: 15px; background: #eee; font-size: 11px; border-radius: 5px;">
                <p><strong>NOTA LEGAL:</strong> Este documento constitui um registo técnico preliminar de discrepâncias algorítmicas. 
                Para efeitos de instrução processual ou prova pericial em tribunal (Cível/Fiscal/Laboral), é indispensável a solicitação de um 
                <strong>Parecer Técnico Assinado</strong> pela Unidade de Peritagem da VDC.</p>
            </div>

            <div style="margin-top: 30px; text-align: center; font-size: 10px; color: #777;">
                Gerado eletronicamente via VDC Plataforma | Integridade de Dados Protegida
            </div>
        </div>
    `;

    const opt = {
        margin: 10,
        filename: `Evidencia_VDC_${new Date().getTime()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Execução do motor de PDF
    html2pdf().set(opt).from(conteudo).save().then(() => {
        console.log("Relatório de Evidência exportado com sucesso.");
    });
}
