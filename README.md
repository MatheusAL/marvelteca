
## Marvelteca 🦸

Uma plataforma para explorar informações sobre os personagens da Marvel através da utilização da API pública da Marvel.

### Tecnologias utilizadas
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://www.tailwindcss.com/)

### Funcionalidades
- Pesquisa de personagens
- Paginação de resultados
- Filtragem com o número de resultados
- Ordenação dos heróis pelo nome ou data de modificação

### Pré-requisitos

Para rodar a aplicação localmente é preciso obter a KEY da API da Marvel, para isso basta acessar a seção para desenvolvedores (https://developer.marvel.com/) do site da Marvel e criar uma conta. Após isso é necessário criar um arquivo .env na raiz do projeto e adicionar as variáveis:

- PUBLIC_KEY
- PRIVATE_KEY

### Instalação

1. Primeiro, é necessário clonar o projeto:
```bash
git clone https://github.com/MatheusAL/marvelteca.git
```
2. Em seguida, a instalação das dependências:
```bash
npm install
#ou
yarn install
```
3. O próximo passo é a criação do arquivo .env na raiz do projeto com as variáveis PUBLIC_KEY PRIVATE_KEY citadas.

4. Por último, para iniciar o servidor de desenvolvimento:
```bash
npm run dev 
# ou
yarn dev
```

### Melhorias

- Utilização de react-query para melhorar a performance das requisições para a API
- Utilização de <Suspense> para mostrar um estado de loading para o usuário.
