# webscrapping-reuters-with-websocket
Aplicação desenvolvida para o Teste Técnico da Axia Futures. 

Webscrapping Puppetteer <br>
WebSockets usando Socket.io <br>
Database utilizada foi um postgres rodando em um Container.

O webscrapping é feito diretamente na api do reuters que a aplicação consome no seu front-end, o que economiza muito tempo no webscrapping.

Também foi incluído um sistema de notificações por som a cada mudança que acontece. A aplicação está consumindo a notícia mais recente do feed de notícias
do https://reuters.com/markets/currencies.

## Como usar a aplicação:
Precisaremos de 3 terminais para rodar a aplicação.

1o => git clone git@github.com:adrielldev/webscrapping-reuters-with-websocket.git
1o => docker-compose up 

-- Database conectada.

2o => cd ./server/index.js && npm i && node ./index.js

-- Instalação dos pacotes do servidor e o ligando

3o => cd ./scrapping/scrap.js && npm i && node ./scrap.js

-- Instalação dos pacotes do WebScrapping e o ativando

Depois destes passos vá em ./frontend/index.html e use uma extensão comum do VSCode como o LiveServer para testar a aplicação.

