# SOCIAL BIG

Este é um projeto desenvolvido utilizando Next.js, React e TypeScript, com a ideia de criar uma rede social, onde é possível criar, comentar e curtir posts, criar sua conta, logar na mesma, dentre outras opções.

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```
src
└── app
    ├── (general)
    │   ├── home
    │   ├── login
    │   ├── marketplace
    │   ├── perfil
    │   └── register
    ├── assets
    ├── shared
    │   ├── @types
    │   ├── components
    │   ├── contexts
    │   ├── hooks
    │   ├── services
    │   │   ├── api
    │   │   │   ├── Auth
    │   │   │   ├── Comment
    │   │   │   ├── Post
    │   │   │   ├── User
    │   │   │   └── api.ts
    │   │   └── tests
    │   │       ├── posts
    │   │       └── users
    │   ├── styles
    │   ├── themes
    └── └── utils

```

## Páginas

- **home**: Página inicial do projeto.
- **login**: Página de login para autenticação dos usuários.
- **marketplace**: Seção do marketplace para exibir produtos/serviços. (Em desenvolvimento.)
- **perfil**: Página de perfil do usuário.
- **register**: Página de registro para novos usuários.

## Shared

- **@types**: Definições de tipos TypeScript utilizados no projeto.
- **components**: Componentes reutilizáveis.
- **contexts**: Contextos React para gerenciamento de estado.
- **hooks**: Hooks personalizados.

## Services

- **api**
  - **Auth**: Serviços de autenticação.
  - **Comment**: Serviços de comentários.
  - **Post**: Serviços de posts.
  - **User**: Serviços de usuários.
- **api.ts**: Arquivo principal de configuração da API.

## Testes

- **posts**: Testes relacionados a posts.
- **users**: Testes relacionados a usuários.

## Styles

Estilos gerais do projeto.

## Themes

Temas e configurações de estilo.

## Utils

Funções utilitárias e helpers usados em todo o projeto.

## Dependências

Este projeto utiliza as seguintes dependências principais:

- Next.js: Framework React para construção de aplicações web.
- React: Biblioteca JavaScript para construção de interfaces de usuário.
- @mui/material: Componentes de interface de usuário do Material-UI.
- react-icons: Conjunto de ícones para React.
- eslint: Ferramenta de linting para identificar e corrigir problemas no código JavaScript/TypeScript.
- jest: Framework de teste para JavaScript.

## Backend

Para que o projeto funcione corretamente, é necessário rodar o backend desenvolvido usando Node.js e Prisma. O código fonte do backend e detalhes do projeto, pode ser encontrado no repositório [link-do-repo](https://github.com/Dev-Henrique-Almeida/Social-Big).

## Instalação

Para instalar e executar este projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```
   git clone https://github.com/Dev-Henrique-Almeida/Social-BIG-Front.git
   ```

2. Navegue até o diretório do projeto:

   ```
   cd Social-BIG-Front
   ```

3. Instale as dependências:

   ```
   npm install
   # ou
   yarn
   ```

4. Execute o servidor de desenvolvimento:

   ```
   npm run dev
   # ou
   yarn dev
   ```

5. Abra o navegador e acesse http://localhost:3000.

## Scripts

- `npm run dev` ou `yarn dev`: Inicia o servidor de desenvolvimento.
- `npm run build` ou `yarn build`: Cria a build de produção.
- `npm start` ou `yarn start`: Inicia o servidor de produção após a build.
- `npm test` ou `yarn test`: Executa os testes utilizando o Jest.
- `npm run lint` ou `yarn lint`: Executa o linter para identificar problemas no código.

## Executando os Testes

Para executar os testes do projeto, use um dos seguintes comandos:

```
npm test
# ou
yarn test
```

Os testes estão localizados no diretório `src/shared/services/tests`, divididos em subdiretórios `posts` e `users` para organizar os testes de acordo com as funcionalidades específicas.
