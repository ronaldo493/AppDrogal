const axios = require('axios');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Caminho do arquivo Excel
const filePath = path.join('G:', 'Arquivos Ti', 'Controle', 'Cronogramas', 'controle.xlsx');

// URL do Strapi (substitua pela URL correta da sua API)
const strapiUrl = 'http://suporteappdrogal.ddns.com.br:18083/api/cronogramas';

// Token de autenticação (substitua pelo token correto)
const token = '9daa01c9a2a011d52e3be0dadafe720ee349c7d77707081c0d9db457662f0a71db6b9c929ba3a813afe67fd0d49216ddbccfd773e5bfd1f0ca9fb9cfeb5ae0f1e7fee4712f24049e0be73433593f42a11ac9701394cd44d787ccd42ca324ed0b2a31b530c3b119b6db4905a41b05b339ba5ca21d0da42417e1224b69184e1055';

// Função para ler o Excel e enviar para o Strapi
async function uploadXlsx() {
  console.log('Iniciando a leitura do arquivo Excel...');

  // Verifica se o arquivo existe
  if (!fs.existsSync(filePath)) {
    console.error('O arquivo Excel não foi encontrado no caminho especificado:', filePath);
    return;
  }

  try {
    // Ler o arquivo Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];  // Primeira aba da planilha
    const sheet = workbook.Sheets[sheetName];

    // Ler todos os dados da planilha como uma matriz de arrays
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    console.log('Arquivo Excel lido com sucesso. Processando dados...');

    // Cabeçalho da linha 1
    const headerRow = data[0]; // Cabeçalho com os dias da semana
    const diaSemanaRow = data[1]; // Dias da semana (segunda, terça, etc.)
    const tarefaRow = data[2]; // Linha com as tarefas para cada dia

    const mes = "Novembro 2024"; // Identificando o mês

    // Diagnóstico: Verificar conteúdo da linha 8
    console.log("Conteúdo da linha 8:", data[7]);

    // Pegando o valor da célula C8 (linha 8, coluna C)
    const preventiva = data[7] ? data[7][2] : null; // Linha 8 (índice 7), coluna C (índice 2)
    
    console.log("Valor de preventiva:", preventiva);

    // Verificar se a preventiva está sendo lida corretamente
    if (!preventiva) {
      console.error("O valor de preventiva não foi encontrado ou está vazio.");
      return;
    }

    // Iterar sobre as linhas após o cabeçalho e enviar para o Strapi
    for (let i = 1; i < diaSemanaRow.length; i++) {
      const diaSemana = diaSemanaRow[i];  // Nome do dia da semana
      const tarefa = tarefaRow[i];  // Tarefa ou valor do dia

      // Validar se a tarefa não está vazia
      if (tarefa) {
        // Criar o payload com dados para cada dia
        const payload = {
          data: {
            dia: tarefa.toString(), // Valor da tarefa do dia
            diaSemana: diaSemana, // Nome do dia da semana
            preventiva: preventiva, // Valor de C8 como preventiva
            mes: mes, // Mês
          }
        };

        console.log(`Enviando dados para o Strapi para o dia ${diaSemana} com valor: ${tarefa}`);

        try {
          // Realizando o POST para o Strapi
          const response = await axios.post(strapiUrl, payload, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          console.log("Dados enviados com sucesso:", response.data);
        } catch (error) {
          console.error("Erro ao enviar dados para o Strapi:", error.response ? error.response.data : error.message);
        }
      }
    }
  } catch (error) {
    console.error("Erro ao processar o arquivo Excel:", error.message);
  }
}

// Executa a função de importação
uploadXlsx();
