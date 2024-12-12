const axios = require('axios');

// Dados das lojas
const stores = [
  {
     "latitude": "-22.739295186263252",
    "longitude": "-47.62465565752399",
     "descricao":"teste"
  },
  
]

// Função para enviar os dados
const uploadStores = async () => {
   const url = 'http://suporteappdrogal.ddns.com.br:18083/api/pontos-ifoods';
   const token = '9daa01c9a2a011d52e3be0dadafe720ee349c7d77707081c0d9db457662f0a71db6b9c929ba3a813afe67fd0d49216ddbccfd773e5bfd1f0ca9fb9cfeb5ae0f1e7fee4712f24049e0be73433593f42a11ac9701394cd44d787ccd42ca324ed0b2a31b530c3b119b6db4905a41b05b339ba5ca21d0da42417e1224b69184e1055';
 
   for (const store of stores) {
     console.log('Iniciando envio para a loja:', store.codigousuario);
     console.log('Dados da loja:', store);
 
     try {
       const response = await axios.post(url, { data: store }, {
         headers: {
           Authorization: `Bearer ${token}`,
           'Content-Type': 'application/json',
         }
       });
 
       console.log(`Loja ${store.codigousuario} adicionada com sucesso:`, response.data);
     } catch (error) {
       // Log de erro detalhado
       console.error(`Erro ao adicionar loja ${store.codigousuario}:`, error.response ? error.response.data : error.message);
       if (error.response) {
         console.error('Detalhes do erro:', error.response.status, error.response.headers);
       }
     }
   }
 };
 

// Executar a função
uploadStores();
