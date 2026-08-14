# projeto-cargas

Sistema web de **agendamento de entregas**, desenvolvido como projeto de **treinamento e portfólio**, com o objetivo de praticar e demonstrar conhecimentos em desenvolvimento Full Stack utilizando tecnologias modernas do ecossistema JavaScript/TypeScript.

O projeto possui uma arquitetura separada entre **frontend** e **backend**, com comunicação através de uma API REST e persistência dos dados utilizando **MySQL**.

**Repositório:** https://github.com/joao-lima-101/projeto-cargas

---

## Sobre o projeto

O **projeto-cargas** é uma aplicação voltada para o gerenciamento e agendamento de entregas.

O projeto foi desenvolvido com foco em:

* Desenvolvimento Full Stack
* Criação de interfaces modernas e responsivas
* Consumo de APIs REST
* Autenticação de usuários
* Validação de dados
* Gerenciamento de estado e requisições
* Persistência de dados em banco relacional
* Organização e separação entre frontend e backend

> Este projeto possui finalidade educacional e de portfólio.

---

## Tecnologias utilizadas

### Frontend

* TypeScript
* React
* Vite
* Chakra UI
* React Router
* React Hook Form
* TanStack React Query
* Axios
* React Icons
* React Number Format
* ESLint

### Backend

* Node.js
* TypeScript
* Express
* Prisma ORM
* MySQL
* JWT
* Bcrypt
* Zod
* Cookie Parser
* CORS
* Dotenv

---

## Arquitetura

O projeto é dividido em duas aplicações principais:

```text
projeto-cargas/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── backend/
    ├── src/
    ├── prisma/
    ├── package.json
    └── ...
```

### Frontend

Responsável pela interface da aplicação e interação com o usuário.

Construído utilizando **React + TypeScript + Vite**, com **Chakra UI** para os componentes e estilização da interface.

A comunicação com o backend é realizada através de requisições HTTP utilizando **Axios**, enquanto o **TanStack React Query** auxilia no gerenciamento das requisições e dos dados provenientes da API.

### Backend

Responsável pelas regras de negócio, autenticação, validação e comunicação com o banco de dados.

Construído utilizando **Node.js + Express + TypeScript**, com **Prisma ORM** para acesso ao banco de dados MySQL.

---

## Autenticação

A aplicação utiliza autenticação baseada em **JWT (JSON Web Token)**.

O backend utiliza:

* `jsonwebtoken` para geração e validação dos tokens;
* `bcrypt` para armazenamento seguro das senhas;
* `cookie-parser` para manipulação de cookies;
* `cors` para controle das requisições entre frontend e backend.

---

## Banco de dados

O projeto utiliza **MySQL** como banco de dados relacional.

O acesso ao banco é realizado através do **Prisma ORM**, permitindo trabalhar com os dados utilizando TypeScript e mantendo uma estrutura organizada para os modelos da aplicação.

Para configurar o banco de dados, é necessário criar um arquivo `.env` no backend.

Exemplo:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/projeto-cargas"
JWT_SECRET="sua_chave_secreta"
```

> Os nomes das variáveis podem variar conforme a configuração utilizada no projeto.

---

## Principais dependências

### Frontend

```json
{
  "@chakra-ui/react": "^3.34.0",
  "@emotion/react": "^11.14.0",
  "@tanstack/react-query": "^5.96.1",
  "axios": "^1.13.6",
  "next-themes": "^0.4.6",
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-hook-form": "^7.71.2",
  "react-icons": "^5.6.0",
  "react-number-format": "^5.4.5",
  "react-router-dom": "^7.13.1"
}
```

### Backend

```json
{
  "@prisma/client": "^6.19.3",
  "bcrypt": "^6.0.0",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "typescript": "^6.0.3",
  "zod": "^4.3.6"
}
```

Principais ferramentas de desenvolvimento do backend:

```json
{
  "@types/cookie-parser": "^1.4.10",
  "@types/cors": "^2.8.19",
  "@types/node": "^25.6.0",
  "prisma": "^6.19.3"
}
```

---

## Como executar o projeto

### Pré-requisitos

Antes de executar o projeto, certifique-se de possuir instalado:

* Node.js
* MySQL
* Git
* npm

### 1. Clone o repositório

```bash
git clone https://github.com/joao-lima-101/projeto-cargas.git
```

Entre na pasta do projeto:

```bash
cd projeto-cargas
```

### 2. Configuração do Backend

Entre na pasta do backend:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env` com as informações do banco de dados e demais variáveis necessárias.

Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

Caso necessário, gere o Prisma Client:

```bash
npx prisma generate
```

Execute o backend:

```bash
npm run dev
```

### 3. Configuração do Frontend

Em outro terminal, entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute a aplicação:

```bash
npm run dev
```

Após iniciar o Vite, a aplicação estará disponível no endereço apresentado no terminal, normalmente:

```text
http://localhost:5173
```

---

## Objetivos de aprendizado

O **projeto-cargas** foi desenvolvido principalmente como uma forma de colocar em prática conceitos de desenvolvimento web Full Stack.

Entre os conhecimentos trabalhados estão:

* TypeScript no frontend e backend;
* Desenvolvimento de aplicações React;
* Criação de APIs REST com Node.js e Express;
* Integração entre frontend e backend;
* Autenticação utilizando JWT;
* Criptografia de senhas com Bcrypt;
* Validação de dados com Zod;
* Formulários com React Hook Form;
* Gerenciamento de requisições com React Query;
* Comunicação HTTP utilizando Axios;
* ORM com Prisma;
* Banco de dados MySQL;
* Componentização utilizando Chakra UI;
* Roteamento com React Router;
* Organização de um projeto Full Stack.

---

## Status do projeto

**Em desenvolvimento**

O projeto pode receber novas funcionalidades, melhorias de interface, ajustes de arquitetura e aprimoramentos de código conforme o aprendizado e evolução do projeto.

---

## Autor

Desenvolvido por **João Lima** como projeto de treinamento e portfólio.

**GitHub:** https://github.com/joao-lima-101

---

## Licença

Este projeto foi desenvolvido para fins de **estudo, treinamento e portfólio**.
