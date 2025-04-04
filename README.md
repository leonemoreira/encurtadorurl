﻿# encurtadorurl
# Encurtador de URL 🚀

Um sistema simples para encurtar URLs usando Node.js e Redis, com suporte a estatísticas de acesso.

## 📝 Descrição
Este projeto é uma aplicação web que permite:
- Encurtar URLs longas gerando códigos únicos (ex.: `abc123`).
- Redirecionar usuários para a URL original ao acessar o código encurtado.
- Armazenar estatísticas de quantas vezes cada URL foi acessada.

O Redis é usado como banco de dados para garantir rapidez no armazenamento e redirecionamento.

## 🎯 Funcionalidades
- **POST /encurtar**: Recebe uma URL longa e retorna uma URL encurtada.
- **GET /{codigo}**: Redireciona para a URL original associada ao código.
- **GET /stats/{codigo}**: Mostra quantas vezes o código foi acessado e a URL original.

## 🛠 Tecnologias Utilizadas
- **Node.js**: Plataforma para executar o servidor.
- **Express**: Framework para criar a API.
- **Redis**: Banco de dados em memória para armazenar URLs e estatísticas.
- **shortid**: Biblioteca para gerar códigos encurtados únicos.
- **Render**: Plataforma de deploy (opcional).

