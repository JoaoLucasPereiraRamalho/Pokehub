# Pokehub - Desafio Zetta Lab

⚡ PokePortal: O Seu Portal Completo do Universo Pokémon

Este projeto foi desenvolvido como parte do Desafio Zetta Lab, com o objetivo de criar um portal dinâmico e interativo para fãs e entusiastas de Pokémon. A aplicação centraliza informações, ferramentas de análise e funcionalidades de comunidade em um só lugar.

🌟 Visão Geral e Funcionalidades

O PokePortal foi concebido para ser uma ferramenta de consulta robusta, oferecendo as seguintes funcionalidades principais:

Pokédex Completa: Consulta rápida de Pokémon, incluindo ID, tipos, habilidades e descrição (Pokédex Entry).

Filtros Avançados: Filtre Pokémon por nome, tipo e geração para encontrar exatamente o que procura.

Itens: Consulta de detalhes sobre itens, incluindo categoria, preço e efeito.

Comparação de Status: Permite que o usuário compare as estatísticas base (BST) de dois Pokémon lado a lado, com destaque visual para os atributos superiores.

Notícias e Destaques: Seções dedicadas a conteúdo em destaque e notícias do universo Pokémon.

Simulação de Batalhas (Funcionalidade Futura): Proposta de uma ferramenta para simular confrontos táticos (ex: testar se um Rattata Lv. 100 pode vencer um Mewtwo Lv. 40). (Ainda não implementada)

🛠️ Tecnologias Utilizadas

O projeto é uma Single Page Application (SPA) construída com o ecossistema moderno do React e tipagem robusta:

Frontend: React com TypeScript.

Estilização: Bootstrap 5 (utilizado principalmente para layout responsivo).

Requisições API: Axios.

Fonte de Dados: PokeAPI (pokémon e itens).

⚠️ Limitações e Observações Importantes

É crucial notar dois pontos sobre o ambiente de execução e a funcionalidade de batalha:

Imagens (Sprites): Este projeto consome algumas imagens (sprites animados e estáticos) que estão hospedadas em repositórios abertos. Devido à alta taxa de requisições, o provedor de hospedagem de imagens (geralmente serviços do GitHub) pode suspeitar de atividade incomum e bloquear temporariamente o acesso aos arquivos.

Solução Recomendada: Se as imagens não carregarem corretamente, utilize uma VPN para acessar o site.

Batalhas: A funcionalidade de Simulação de Batalhas (Battle) está presente no layout, mas a lógica de simulação em si não está implementada.

🚀 Como Rodar o Projeto Localmente

Siga estes passos simples para configurar e executar o PokePortal em sua máquina:

Clone o Repositório: "https://github.com/JoaoLucasPereiraRamalho/Pokehub.git"

git clone
cd pokehub

Instale as Dependências:

npm install

Inicie o Servidor de Desenvolvimento:

npm run dev

Acesse a Aplicação:
Abra seu navegador e acesse o endereço: http://localhost:5173/ (ou a porta indicada no seu terminal).

🎨 Link do Figma

O design e o protótipo visual deste projeto estão documentados no Figma:

https://www.figma.com/design/5dfvSF2nfccq2xE09ZcZTE/Untitled?node-id=0-1&p=f&t=vBkc3BwCReM6N6sN-0
