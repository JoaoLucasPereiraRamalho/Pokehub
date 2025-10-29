# ⚡ Pokehub - Desafio Zetta Lab

## 🌀 **PokePortal: O Seu Portal Completo do Universo Pokémon**

Este projeto foi desenvolvido como parte do **Desafio Zetta Lab**, com o objetivo de criar um portal dinâmico e interativo para fãs e entusiastas de Pokémon.
A aplicação centraliza informações, ferramentas de análise e funcionalidades de comunidade em um só lugar.

---

## 🌟 **Visão Geral e Funcionalidades**

O **PokePortal** foi concebido para ser uma ferramenta de consulta robusta, oferecendo as seguintes funcionalidades principais:

- **Pokédex Completa:** Consulta rápida de Pokémon, incluindo ID, tipos, habilidades e descrição (_Pokédex Entry_).
- **Filtros Avançados:** Filtre Pokémon por nome, tipo e geração para encontrar exatamente o que procura.
- **Itens:** Consulta de detalhes sobre itens, incluindo categoria, preço e efeito.
- **Comparação de Status:** Compare as estatísticas base (BST) de dois Pokémon lado a lado, com destaque visual para os atributos superiores.
- **Notícias e Destaques:** Seções dedicadas a conteúdo em destaque e notícias do universo Pokémon.
- **Simulação de Batalhas (Funcionalidade Futura):** Proposta de uma ferramenta para simular confrontos táticos (ex: testar se um _Rattata Lv.100_ pode vencer um _Mewtwo Lv.40_). _(Ainda não implementada)_

---

## 🛠️ **Tecnologias Utilizadas**

O projeto é uma **Single Page Application (SPA)** construída com o ecossistema moderno do **React** e tipagem robusta em **TypeScript**.

- **Frontend:** React + TypeScript
- **Estilização:** Bootstrap 5 (layout responsivo)
- **Requisições API:** Axios
- **Fonte de Dados:** [PokeAPI](https://pokeapi.co/) _(Pokémon e Itens)_

---

## ⚠️ **Limitações e Observações Importantes**

É importante destacar dois pontos sobre o ambiente de execução e a funcionalidade de batalha:

### 🖼️ **Imagens (Sprites)**

O projeto consome algumas imagens (sprites animados e estáticos) hospedadas em repositórios abertos.
Devido à alta taxa de requisições, o provedor de hospedagem (geralmente GitHub) pode bloquear temporariamente o acesso.

**Solução Recomendada:**
Se as imagens não carregarem corretamente, utilize uma **VPN** para acessar o site.

### ⚔️ **Batalhas**

A funcionalidade de **Simulação de Batalhas (Battle)** está presente no layout, porém a lógica de simulação **ainda não está implementada**.

---

## 🚀 **Como Rodar o Projeto Localmente**

Siga os passos abaixo para configurar e executar o **PokePortal** na sua máquina:

1. **Clone o Repositório:**

   ```bash
   git clone https://github.com/JoaoLucasPereiraRamalho/Pokehub.git
   cd Pokehub
   ```

2. **Instale as Dependências:**

   ```bash
   npm install
   ```

3. **Inicie o Servidor de Desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Acesse a Aplicação:**
   Abra o navegador e acesse:

   ```
   http://localhost:5173/
   ```

   _(ou a porta indicada no terminal)_

---

## 🎨 **Link do Figma**

O design e o protótipo visual deste projeto estão documentados no Figma:

👉 [Acesse o Figma do Projeto](https://www.figma.com/design/5dfvSF2nfccq2xE09ZcZTE/Untitled?node-id=0-1&p=f&t=vBkc3BwCReM6N6sN-0)

---

### 💡 **Autor**

Desenvolvido por **João Lucas Pereira Ramalho** — Projeto do **Desafio Zetta Lab**
