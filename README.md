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

### 1 Conectando database e instalando pacotes


- 1.1  git clone git@github.com:adrielldev/webscrapping-reuters-with-websocket.git <br>
- 1.2  cd webscrapping-reuters-with-websocket/ <br>
- 1.3  npm i <br>
- 1.4  docker-compose up -d


###  2 Iniciando Serrvidor com Websocket

- 2.1  node ./server/index.js

### 3 Iniciando Webscrapping

- 3.1 node ./scrap.js

Depois destes passos basta apenas consumirmos nossa aplicação no front-end. <br>
Em outro terminal cd ./frontend && code .  <br>
Use a extensão Liveserver no arquivo index.html para testar a aplicação.

