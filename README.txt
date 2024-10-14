Estrutura do Projeto

components/
	SearchBar.js: Permite pesquisar e selecionar uma filial pelo código ou nome da cidade. 		Exibe detalhes da filial e um botão para adicioná-la à rota.
	RouteList.js: Exibe a lista de filiais adicionadas. Permite remover uma filial da 		lista.
	Sidebar.js: Menu lateral com opções de navegação para Home, Histórico, Mapa de Lojas, 		Chamados e Configurações.
	ThemeContext.js: Contexto para gerenciar o tema (claro ou escuro) do aplicativo.
screens/
	Home.js: Tela principal com a barra de pesquisa, lista de rotas e botão para traçar a 		rota. Obtém e usa a localização atual do usuário.
	Historico.js: Exibe o histórico de rotas traçadas pelo usuário.
	MapaLojas.js: Mostra um mapa com marcadores das filiais, permitindo a filtragem por 		cidade.
	Chamados.js: Tela para gerenciamento de chamados (ainda em desenvolvimento).
	Settings.js: Tela de configurações (ainda em desenvolvimento).
services/
	MapService.js: Serviço para gerar e abrir URLs do Google Maps com a rota traçada, 		incluindo a localização atual e as filiais selecionadas.
data/
	filiais.json: Contém informações das filiais, como código, nome, endereço, telefone e 		CNPJ.
	OBS: LOJA 03, 126 e 31 vieram duplicadas no arquivo.