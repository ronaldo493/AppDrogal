Estrutura do Projeto

components/
	SearchBar.js: Essa tela implementa uma barra de busca que permite ao usuário buscar uma filial pelo código dela. 
	Quando o usuário digita o número da filial, o app consulta um banco de dados SQLite para encontrar a filial correspondente. 
	Se encontrada, exibe detalhes da filial (como nome, endereço e telefone) e oferece um botão "Adicionar". 
	Quando o usuário clica em "Adicionar", a filial selecionada é enviada para outra parte do app, conforme definido 
	pela função onAddRoute passada como parâmetro ao componente.

	RouteList.js: Este componente exibe uma lista de rotas (filiais) utilizando o FlatList. Cada item da lista mostra o nome 
	da filial e um ícone de lixeira que permite ao usuário remover a rota correspondente ao clicar. 
	Os estilos mudam conforme o modo claro ou escuro, ajustando-se automaticamente ao tema atual.

	Sidebar.js: O código define um componente Sidebar para um aplicativo React Native. Ele utiliza o contexto de tema para 
	aplicar estilos de acordo com o modo escuro ou claro. A barra lateral contém um menu com opções de navegação, 
	como "Rotas", "Histórico", "Mapa de Lojas", "Chamados" e "Configurações". Cada item de menu é um botão que, 
	ao ser pressionado, redireciona o usuário para a tela correspondente. Há também um botão de logout que, ao ser acionado, 
	fecha o aplicativo. Além disso, o componente inclui recursos de acessibilidade para melhorar a experiência do usuário.

	ThemeContext.js: O código cria um contexto para gerenciar o tema (claro ou escuro) em um aplicativo React Native. 
	O ThemeProvider usa useState para controlar o estado do tema e carrega a preferência do usuário do AsyncStorage ao iniciar.
	A função toggleTheme alterna entre os modos e atualiza o armazenamento. O useTheme permite que outros componentes acessem 
	facilmente o estado e a função de alternância do tema.

screens/
	Home.js: A tela Home é a interface principal do aplicativo, permitindo ao usuário buscar e adicionar filiais, 
	visualizar e remover rotas e traçar um percurso até as filiais selecionadas. O usuário pode procurar filiais pelo código 
	usando o componente SearchBar, e as filiais selecionadas são exibidas com o componente RouteList, onde é possível 
	removê-las. Ao clicar em "Traçar Rota", a aplicação obtém a localização atual do usuário, 
	armazena a rota no histórico e oferece a opção de abrir o percurso no Google Maps ou Waze. 
	A tela também se adapta automaticamente ao tema claro ou escuro configurado pelo usuário, integrando assim as principais 
	funcionalidades do aplicativo

	Historico.js: A tela de histórico exibe um registro das rotas anteriormente traçadas pelo usuário. 
	Ela carrega os dados do histórico armazenados localmente usando o AsyncStorage sempre que a tela é focada, garantindo que 
	as informações estejam atualizadas. Cada entrada no histórico mostra a data da rota e lista as filiais e cidades 
	correspondentes. O usuário pode limpar o histórico, com uma confirmação para evitar exclusões acidentais. 
	A interface é adaptável ao modo escuro, utilizando estilos dinâmicos para melhor visualização.

	MapaLojas.js: A tela MapaLojas é um componente React Native que apresenta um mapa interativo, permitindo ao usuário 
	pesquisar filiais de lojas em uma cidade. O mapa é inicialmente centrado em Piracicaba e exibe a localização atual 
	do usuário com um marcador azul.
	Ao digitar o nome de uma cidade, o componente filtra as filiais armazenadas em um banco de dados SQLite e ajusta a região 
	do mapa para a primeira filial correspondente. Em resumo, a tela facilita a localização de filiais de lojas com base 
	na pesquisa de cidades e na localização do usuário.

	Chamados.js:  Em desenvolvimento.

	Settings/
		Settings.js: A tela Settings permite ao usuário ajustar as configurações do aplicativo. Ela apresenta um título 
		"CONFIGURAÇÕES" e contém uma opção para ativar ou desativar o modo escuro usando um interruptor (Switch). 
		O estado do modo escuro é gerenciado através do useTheme para aplicar estilos adequados.
		Além disso, a tela possui dois botões, que ao serem pressionados, navegam para as telas de "Suporte" e "Sobre". 
		Cada opção é apresentada em um contêiner estilizado, e os estilos aplicados dependem do tema atual (claro ou escuro).

		Suporte.js: A tela Suporte fornece informações úteis sobre o aplicativo, destacando a necessidade de ativar a 
		localização do celular para um funcionamento adequado. Inclui dicas sobre como usar o Google Maps para traçar rotas, 
		consultar tarefas pendentes, visualizar lojas próximas e ativar o modo escuro. Também menciona que é possível acessar 
		atribuições anteriores offline e alerta para funcionalidades em desenvolvimento. Um botão "Voltar" permite retornar à 
		tela anterior.

		About.js: A tela "Sobre" do aplicativo tem o objetivo de apresentar informações sobre sua finalidade e funcionalidades.

	Preventiva/
		Preventiva.js: A tela "Preventiva" permite que o usuário insira o nome ou código de uma filial e, ao clicar no botão 
		"COMEÇAR", navega para a tela de assinatura. Se o campo estiver vazio, uma mensagem de alerta é exibida. 
		Também há um botão para visualizar ou esconder um checklist adicional, que só é exibido quando ativado. 
		A interface se adapta ao modo claro ou escuro para melhor usabilidade.

		Checklist.js: A tela "Checklist" exibe uma lista de tarefas a serem realizadas durante uma manutenção preventiva.

		PatrimonioAssinatura.js: A tela PatrimonioAssinatura permite o registro e gerenciamento do patrimônio de uma filial 
		específica, facilitando o acompanhamento e organização de máquinas e equipamentos. O componente oferece botões para 
		selecionar categorias como "CAIXA", "BALCÃO", "SERVIDOR", "GERENTE", "CLÍNICA" e "RACK", permitindo que o usuário 
		visualize e adicione itens a essas categorias dinamicamente. A tela utiliza o componente MaquinaSection para exibir 
		as seções de itens relacionados e gerencia os estados para exibição do modal de seleção, controle de itens adicionados 
		e escolha das seções.

		MaquinaSection.js: O componente MaquinaSection exibe uma seção de itens relacionados a uma máquina específica, 
		como "Caixa G", "Caixa H" e outras. Cada seção possui um título e uma lista de itens, que são renderizados 
		usando o componente MaquinaItem. Além disso, o componente apresenta um botão para adicionar novos itens, abrindo 
		um modal para que o usuário escolha entre os itens disponíveis. Também há um botão para excluir uma seção, 
		facilitando o gerenciamento das máquinas dentro da tela de patrimônio.

		MaquinaItem.js: O componente MaquinaItem representa um item individual em uma seção de máquinas. Ele exibe um rótulo 
		do item, um campo de entrada para o número de patrimônio, e um botão para escanear o patrimônio. Caso o item 
		exija seleção, um Picker é exibido para permitir ao usuário escolher entre diferentes opções, como modelos 
		específicos de leitores ou impressoras. Este componente é modular e simplificado, permitindo que o usuário 
		adicione ou modifique informações sobre cada item com facilidade.

		OBSERVAÇÃO: Essas telas são complementadas, pois o PatrimônioAssinatura é organizado como MaquinaSection 
		(que são os pacotes específicos de máquinas) e cada MaquinaSection organiza os MaquinaItem (os itens individuais). 
		Assim, você tem um sistema hierárquico: uma tela mostra uma categoria, a outra mostra a seção dessa categoria, 
		e a última mostra o item individual dentro dessa seção.



services/
	MapService.js: O MapService é um módulo que fornece funções para abrir rotas em aplicativos de navegação. 
	Ele contém duas principais funções: a função openGoogleMapsRoute constrói uma URL para abrir rotas no Google Maps, 
	utilizando a localização atual, pontos de passagem e destino, e não executa nada se não houver rotas disponíveis. 
	A função openWazeRoute monta uma URL para abrir o Waze com o destino final, e caso o Waze não esteja instalado, 
	exibe um alerta solicitando a instalação do aplicativo. Esse módulo facilita a navegação, permitindo que os usuários 
	abram rotas rapidamente nos dois aplicativos de mapa mais populares.

	StrapiClient.js: A função fetchPaginatedData realiza a busca de dados paginados de uma API Strapi utilizando a biblioteca 
	axios. Ela faz requisições à URL base da API, passando parâmetros de paginação, e coleta todos os dados disponíveis 
	até que não haja mais páginas a serem carregadas. Os dados são armazenados em um array e retornados ao final da execução. 
	A função também inclui um tratamento de erros para lidar com eventuais falhas durante as requisições.

	StrapiProvider.js: O código implementa um contexto React para gerenciar a integração de dados de filiais de uma API Strapi
	com um banco de dados SQLite local. Ele cria um banco de dados, define uma tabela para armazenar informações de 
	filiais e permite que os dados sejam salvos ou atualizados no banco. O StrapiProvider busca dados paginados da API, 
	salva esses dados no banco de dados, e utiliza AsyncStorage para verificar se os dados já foram carregados anteriormente.