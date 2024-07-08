# Documentação da API

## Introdução

Esta API fornece um conjunto de endpoints para gerenciar clientes, itens de pedido, pedidos e produtos. Abaixo está um guia abrangente sobre as rotas disponíveis e suas funcionalidades.

## Como Começar

Para começar com esta API, siga as instruções abaixo:

1. **Clonar o repositório:**
    ```bash
    git clone <url do repositorio>
    cd carrinho-de-compras-alanamandimifsc
    ```

2. **Instalar as dependências:**
    ```bash
    npm install
    ```

3. **Configurar banco de dados:**
   Na pasta [src/database](./src/database) você encontrará o local para configurar o acesso ao banco e os comandos para criação do database e das tabelas.

4. **Iniciar a aplicação:**
    ```bash
    npm start
    ```

## Endpoints

### Clientes

- **POST /clients/**
  - Cria um novo cliente.
  - Endpoint: `/clients/`
  - Middleware de validação: `validateClient`
  - Controlador: `ClientsController.create`

- **GET /clients/**
  - Lista todos os clientes.
  - Endpoint: `/clients/`

### Itens de Pedido

- **POST /order-items/**
  - Cria um novo item de pedido.
  - Endpoint: `/order-items/`
  - Controlador: `OrderItemController.create`

### Pedidos

- **POST /orders/**
  - Cria um novo pedido (carrinho).
  - Endpoint: `/orders/`
  - Controlador: `OrderController.create`

### Produtos

- **POST /products/**
  - Cria um novo produto.
  - Endpoint: `/products/`
  - Controlador: `ProductController.create`

- **GET /products/**
  - Lista todos os produtos.
  - Endpoint: `/products/`
  - Controlador: `ProductController.index`

- **GET /products/:id**
  - Obtém detalhes completos de um produto específico pelo ID.
  - Endpoint: `/products/:id`
  - Controlador: `ProductController.indexComplete`

## Exemplos de Requisições com curl

Aqui estão exemplos de como utilizar os endpoints da API utilizando `curl`.

### Criar Cliente

```bash
curl -X POST http://localhost:3000/client -H "Content-Type: application/json" -d '{
    "name": "Alana",
    "email": "alana@gmail.com",
    "cpf": "10608257893",
    "contact": "21988889988"
}'
```

### Criar Produto
 ```bash
 curl -X POST http://localhost:3000/product -H "Content-Type: application/json" -d '{
    "name": "TV",
    "voltage": "220",
    "category_id": 1
}'
```
### Listar Produtos
 ```bash
 curl http://localhost:3000/product

```

### Obter produto por ID
 ```bash
 curl http://localhost:3000/product/1

```

### Criar Pedido
```bash
curl -X POST http://localhost:3000/order -H "Content-Type: application/json" -d '{
    "client_id": 1,
    "address": "Rua Exemplo, 123",
    "observations": "Entregar após as 18h",
    "status": "Em andamento"
}'
```

### Criar um Item de Pedido

```bash
curl -X POST http://localhost:3000/order-item \
  -H "Content-Type: application/json" \
  -d '{
        "product_id": 1,
        "amount": "2",
        "client_id": 1,
        "order_id": 12
      }'
```



Esta documentação fornece uma visão geral dos endpoints disponíveis e suas funcionalidades na API. Certifique-se de configurar corretamente as variáveis de ambiente e utilizar os middlewares e controladores correspondentes para cada rota.



[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/dNOfMvCD)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15333269&assignment_repo_type=AssignmentRepo)
