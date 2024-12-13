import { fetchPaginatedData } from "./StrapiClient";
import { initDB } from '../data/db';

// Função para atualizar ou inserir dados do Strapi na tabela local
export const syncDataWithStrapi = async (endpoint, tableName, keyField, columns) => {
  try {
    const db = await initDB();
    const strapiData = await fetchPaginatedData(endpoint);

    for (const item of strapiData) {
      // Busca dados locais para verificar se o registro já existe
      const localData = await db.getAllAsync(`SELECT * FROM ${tableName} WHERE ${keyField} = ?;`, [item[keyField]]);

      if (localData && localData.length > 0) {
        const localItem = localData[0];

        // Compara os dados para verificar se houve mudança
        const differences = Object.keys(item).filter((key) => {
          if (!(key in localItem)) return false;
          const itemValue = item[key];
          const localValue = localItem[key];
          return JSON.stringify(itemValue) !== JSON.stringify(localValue);
        });

        // Se houver mudanças, faz o UPDATE
        if (differences.length > 0) {
          console.log(`Mudanças detectadas para ${item[keyField]} na tabela ${tableName}:`, differences);

          const updateColumns = columns.filter(column => column !== 'last_modified');
          const updateValues = updateColumns.map(column => item[column] || null);

          await db.runAsync(
            `UPDATE ${tableName} SET ${updateColumns.map(col => `${col} = ?`).join(', ')}, last_modified = CURRENT_TIMESTAMP WHERE ${keyField} = ?;`,
            [...updateValues, item[keyField]]
          );
          console.log(`Registro atualizado na tabela ${tableName}: ${item[keyField]}`);
        } else {
          console.log(`Nenhuma mudança detectada para: ${tableName} ${item[keyField]}`);
        }
      } else {
        // Se o registro não existir, faz a inserção
        console.log(`Inserindo novo registro na tabela ${tableName}: ${item[keyField]}`);
        await db.runAsync(
          `INSERT INTO ${tableName} (${columns.join(', ')}, last_modified) VALUES (${columns.map(() => '?').join(', ')}, CURRENT_TIMESTAMP);`,
          [...columns.map(column => item[column] || null)]
        );
        console.log(`Registro inserido na tabela ${tableName}: ${item[keyField]}`);
      }
    }
  } catch (error) {
    console.error(`Erro ao sincronizar dados da tabela ${tableName} com o endpoint ${endpoint}:`, error);
  }
};
