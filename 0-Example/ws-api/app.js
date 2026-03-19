import { serve } from "https://deno.land/std@0.222.1/http/server.ts";

const content = ["Never", "gonna", "give", "you", "up"];
let i = 0;

const sockets = new Set();

setInterval(() => {
  let data = {
    user: "Rick",
    message: `${content[i]}`,
  }
  sockets.forEach((socket) => socket.send(JSON.stringify(data)));
  i = (i + 1) % content.length;
}, 1000);

const handleRequest = async (request) => {
  const { socket, response } = Deno.upgradeWebSocket(request);

  sockets.add(socket);

  socket.onclose = () => {
    sockets.delete(socket);
  };

  return response;
};

serve(handleRequest, { port: 7779 });