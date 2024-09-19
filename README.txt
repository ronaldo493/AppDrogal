Estrutura do Projeto
	App.js: Configura a navegação principal do aplicativo usando DrawerNavigator. Inclui as telas Home e Settings, e um menu lateral (Sidebar).

components/:
	SearchBar.js: Permite pesquisar e selecionar uma filial pelo código. Exibe detalhes da filial e um botão para adicioná-la à rota.
	RouteList.js: Exibe a lista de filiais adicionadas. Permite remover uma filial da lista.
	Sidebar.js: Menu lateral com opções de navegação para Home, Histórico, Mapa de Lojas e Configurações.

screens/:
	Home.js: Tela principal com a barra de pesquisa, lista de rotas e botão para traçar a rota. Obtém e usa a localização atual do usuário.
	Settings.js: Tela de configurações (ainda em desenvolvimento).

services/:
	MapService.js: Serviço para gerar e abrir URLs do Google Maps com a rota traçada, incluindo a localização atual e as filiais selecionadas.

data/:
	filiais.json: Contém informações das filiais, como código, nome, endereço, telefone e CNPJ.

