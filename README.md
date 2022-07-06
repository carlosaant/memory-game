# Memory Game - World of Warcraft

Um jogo da memoria utilizando como tema as classes do popular MMORPG World of Warcraft.

## Processo de Desenvolvimento

1. Criação do Projeto e Pagina principal, Subpastas e arquivos CSS e JS
2. Estilização Basica da Pagina e configuração de Modelo de Card
3. Desenvolvimento da lógica inicial de cards `front` e `back` aplicando imagens
4. Desenvolvimento da lógica funcional do game, gerando as cards e o tabuleiro aplicando as classes e embaralhando as cards
5. Reorganizado código separando view e lógica do game
6. Estilização final para diferentes telas

#### Como deve funcionar?

Ao carregar a pagina, terá um botão `iniciar` que ao ser clicado sera executada as funções de
`inicioGame` que são responsaveis por criar as cards, embaralhas e distruibuir no tabuleiro.

Ao selecionar uma card ativando a função `flipCardElement`, a mesma é virada e armazenada em uma variavel local `firstCard` e `secondCard` e seus status `flipped` alterados para `true`, alem de amparadas por outra variavel que controla o andamento do jogo para que demais cards não sejam selecionando durante uma verificação, `lockMode`.

Quando as cards são correspondetes, verificadas atraves do método `checkCardsMatch` que verifica `firstCard.name` e `secondCard.name` ambas são mantidas, e caso contrario é resetado o `lockMode` por `clearCardLockMode` e seus status `flipped` retornados a `false`.

A cada interação entre 2 elementos selecionados, o contador de movimentos é incrementado.
