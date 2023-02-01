const WebSocket = require("ws");

const createWebSocketServer = (server) => {
  const wsServer = new WebSocket.Server({ server });
  const map = new Map();//設定名字

  wsServer.on("connection", (ws, req) => {
    map.set(ws, { name: '' });
    console.log("連線數:", wsServer.clients.size);
    ws.send("連線了~");
    ws.on("message", (message) => {
      const myObj = map.get(ws);
      //設定一個msg變數
      let msg;
      if (!myObj) {
        //如果沒有名字，設定名字為message
        myObj.name = message;
        //設置使用者進入聊天室訊息
        msg = `歡迎${myObj.name}光臨`
      } else {
        //設好名字了，開始聊天
        msg = `${myObj.name}:${message}`;
      }
      wsServer.clients.forEach(c => {
        if (c.readyState == WebSocket.OPEN) {
          c.send(msg);
        }
      })
      ws.send(message.toString());//要轉成字因為更新後型態改變
    });
  });
};

module.exports = createWebSocketServer;

