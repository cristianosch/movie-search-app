# 🎬 Movie Search App

Este é um projeto em React que permite pesquisar por filmes usando a API do TMDb. Ele também exibe uma lista de filmes em alta e usa debounce para otimizar as requisições feitas à API.
✨ Funcionalidades

    🔍 Busca de filmes em tempo real com debounce (500ms)

    📈 Exibição dos filmes mais populares (trending)

    🌀 Indicador de carregamento durante requisições

    ⚠️ Tratamento de erros em chamadas à API

    📊 Contador de buscas usando integração com Appwrite

# 📸 Captura de Tela

(./public/image.png)


# 🛠️ Tecnologias Utilizadas

	React

	Appwrite (para salvar as pesquisas realizadas)

	TMDb API

	react-use (useDebounce)

# 🚀 Como Rodar Localmente

Pré-requisitos

    Node.js e npm instalados

    Conta na TMDb para gerar uma API Key

    Appwrite configurado para salvar os dados (opcional)

**Passo a passo**

1. Clone o repositório:
	git clone https://github.com/cristianosch/movie-search-app.git
	cd movie-search-app

2. Instale as dependências:
   
   npm install

3. Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
   
	VITE_TMDB_API_KEY=your_tmdb_api_key

4. Inicie o projeto:

	npm run dev

A aplicação estará disponível em http://localhost:5173

# 🧠 Estrutura do Projeto

	src/
	├── components/
	│   ├── MovieCard.jsx
	│   ├── Search.jsx
	│   └── Spinner.jsx
	├── appwrite.js
	└── App.jsx

# 📡 Chamadas à API

Filmes populares:

	GET /discover/movie?sort_by=popularity.desc

Pesquisa por título:

	GET /search/movie?query=searchTerm

# 🙌 Créditos

Este projeto foi desenvolvido como exercício prático durante os estudos com o canal JavaScript Mastery no YouTube.