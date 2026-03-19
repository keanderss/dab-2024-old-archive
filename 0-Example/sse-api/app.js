import { serve } from "https://deno.land/std@0.222.1/http/server.ts";

const content = ["Never", "gonna", "give", "you", "up"];
const encoder = new TextEncoder();
let i = 0;

let controllers = new Set();

setInterval(() => {
  let data = {
    user: "Rick",
    message: `${content[i]}`,
  }
  let msg = encoder.encode(`data: ${ JSON.stringify(data) }\n\n`);
  controllers.forEach((controller) => (controller.enqueue(msg)));
  i = (i + 1) % content.length;
}, 1000);

const handleRequest = async (request) => {
  let controller;

  const body = new ReadableStream({
    start(c) {
      controller = c;
      controllers.add(controller);
    },
    cancel() {
      controllers.delete(controller);
    },
  });

  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Access-Control-Allow-Origin": "*",
      "Connection": "keep-alive",
    },
  });
};

serve(handleRequest, { port: 7778 });