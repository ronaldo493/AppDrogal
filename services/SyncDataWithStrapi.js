const fetchPaginatedData = require('./fetchPaginatedData'); // Importar a função de fetch (se necessário)

const syncDataWithStrapi = async (endpoint, tableName, db) => {
  try {
    // Obtém os dados do Strapi (página de informações)
    const strapiData = await fetchPaginatedData(endpoint);

    // Para cada item retornado do Strapi
    for (const item of strapiData) {
      // Para tabelas que possuem codigofilial
      if (tableName === 'filiais' || tableName === 'chamados') {
        // Verifica se já existe um registro local com o codigofilial
        const localData = await db.getAllAsync(`SELECT * FROM ${tableName} WHERE codigofilial = ?;`, [item.codigofilial]);

        if (localData && localData.length > 0) {
          const localItem = localData[0];
          const differences = Object.keys(item).filter((key) => {
            if (!(key in localItem)) return false;
            return JSON.stringify(item[key]) !== JSON.stringify(localItem[key]);
          });

          if (differences.length > 0) {
            console.log(`Mudanças detectadas para ${item.codigofilial} na tabela ${tableName}:`, differences);

            const updateFields = differences.map(field => `${field} = ?`).join(', ');
            const updateValues = differences.map(field => item[field]);

            updateValues.push(item.codigofilial);

            await db.runAsync(
              `UPDATE ${tableName} SET ${updateFields}, last_modified = CURRENT_TIMESTAMP WHERE codigofilial = ?;`,
              updateValues
            );
          } else {
            console.log(`Nenhuma mudança detectada para: ${item.codigofilial}`);
          }
        } else {
          console.log(`Inserindo novo registro na tabela ${tableName}: ${item.codigofilial}`);
          
          const columns = Object.keys(item).join(', ');
          const placeholders = Object.keys(item).map(() => '?').join(', ');
          const values = Object.values(item);

          await db.runAsync(
            `INSERT INTO ${tableName} (${columns}, last_modified) VALUES (${placeholders}, CURRENT_TIMESTAMP);`,
            values
          );
        }
      } else {
        // Para tabelas sem codigofilial (como pontosIfoods e pontosAbastecimentos)
        const localData = await db.getAllAsync(`SELECT * FROM ${tableName} WHERE latitude = ? AND longitude = ?;`, [item.latitude, item.longitude]);

        if (localData && localData.length > 0) {
          const localItem = localData[0];
          const differences = Object.keys(item).filter((key) => {
            if (!(key in localItem)) return false;
            return JSON.stringify(item[key]) !== JSON.stringify(localItem[key]);
          });

          if (differences.length > 0) {
            console.log(`Mudanças detectadas para ponto em (${item.latitude}, ${item.longitude}) na tabela ${tableName}:`, differences);

            const updateFields = differences.map(field => `${field} = ?`).join(', ');
            const updateValues = differences.map(field => item[field]);

            updateValues.push(item.latitude, item.longitude);

            await db.runAsync(
              `UPDATE ${tableName} SET ${updateFields}, last_modified = CURRENT_TIMESTAMP WHERE latitude = ? AND longitude = ?;`,
              updateValues
            );
          } else {
            console.log(`Nenhuma mudança detectada para: (${item.latitude}, ${item.longitude})`);
          }
        } else {
          console.log(`Inserindo novo ponto na tabela ${tableName}: (${item.latitude}, ${item.longitude})`);

          const columns = Object.keys(item).join(', ');
          const placeholders = Object.keys(item).map(() => '?').join(', ');
          const values = Object.values(item);

          await db.runAsync(
            `INSERT INTO ${tableName} (${columns}, last_modified) VALUES (${placeholders}, CURRENT_TIMESTAMP);`,
            values
          );
        }
      }
    }
  } catch (error) {
    console.error(`Erro ao sincronizar dados da tabela ${tableName} com o endpoint ${endpoint}:`, error);
  }
};

module.exports = syncDataWithStrapi;