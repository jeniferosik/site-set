# Site.Set — Site e Blog

Projeto de estudos desenvolvido no contexto da Rocketseat: uma landing page para o Site.Set e um blog com artigos sobre lojas virtuais e negócios online.

## Funcionalidades

- Landing page com apresentação do produto, funcionalidades, depoimentos e chamadas para ação.
- Listagem de artigos ordenados do mais recente para o mais antigo.
- Busca por título com o parâmetro `q` na URL e mensagem quando nenhum artigo é encontrado.
- Página de artigo com capa, autor, data de publicação e navegação por breadcrumb.
- Compartilhamento em redes sociais e cópia do link.
- Layout responsivo e conteúdo mantido em arquivos locais.

## Tecnologias

- Next.js 16 com Pages Router e React 19.
- TypeScript.
- Tailwind CSS 4.
- Componentes com shadcn/ui, Radix UI e ícones Lucide.
- Arquivos `.mdx` com metadados YAML lidos pelo `gray-matter`.
- Renderização de Markdown com `react-markdown` e `remark-gfm`.

As versões das dependências estão em [package.json](./package.json).

## Como executar

Requisitos: Node.js 20.9 ou superior e npm.

Na pasta do projeto, instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm ci
npm run dev
```

Acesse [localhost:3000](http://localhost:3000). O blog fica em [localhost:3000/blog](http://localhost:3000/blog).

## Comandos disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a versão de produção. |
| `npm start` | Inicia o servidor de produção após o build. |
| `npm run lint` | Executa a análise de código com ESLint. |

Para executar a versão de produção localmente:

```bash
npm run build
npm start
```

## Rotas

| Rota | Conteúdo |
| --- | --- |
| `/` | Landing page do Site.Set. |
| `/blog` | Listagem de artigos. |
| `/blog?q=loja` | Busca por títulos que contenham o termo informado. |
| `/blog/[slug]` | Página de um artigo, identificado pelo nome do arquivo. |

## Como adicionar um artigo

Crie um arquivo em `posts/`, por exemplo, `posts/minha-loja-virtual.mdx`. O nome do arquivo define a URL: `/blog/minha-loja-virtual`.

Adicione os metadados no início do arquivo e escreva o conteúdo em Markdown:

```md
---
title: "Minha loja virtual"
description: "Dicas para começar a vender online."
date: "2026-11-01 10:00:00"
image: "/assets/primeiro-post.png"
author:
  name: "Nome da pessoa autora"
  avatar: "/avatar-1.png"
---

## Como começar

Escreva o conteúdo do artigo aqui.
```

Todos os campos do exemplo são obrigatórios. Mantenha a data entre aspas, no formato `AAAA-MM-DD HH:mm:ss`, para que seja lida como texto e ordenada corretamente.

As imagens do exemplo já existem no projeto. Para usar outras, coloque as capas em `public/assets/` e os avatares em `public/`, referenciando os caminhos sem o prefixo `public`.

Embora os arquivos tenham extensão `.mdx`, o conteúdo dos artigos é renderizado como Markdown; componentes JSX não são executados nessa renderização.

A listagem é gerada no build. Até cinco artigos mais recentes têm suas páginas pré-geradas; os demais são gerados no primeiro acesso com `fallback: "blocking"`. Ao adicionar ou alterar artigos em produção, gere um novo build.

## Estrutura do projeto

```text
posts/                  Artigos e metadados
public/                 Imagens e arquivos estáticos
src/
  components/           Componentes reutilizáveis e layout
  hooks/                Hooks de compartilhamento e área de transferência
  lib/                  Leitura, validação e ordenação dos artigos
  pages/                Rotas com Pages Router
  styles/               Estilos globais e configuração visual
  templates/            Landing page, listagem e página de artigo
  types/                Declarações de tipos
```
